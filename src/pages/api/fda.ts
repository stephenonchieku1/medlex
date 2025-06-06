import type { APIRoute } from "astro";
export const prerender = false;

interface FDAResponse {
  results: Array<{
    ndc: string;
    name: string;
    synonym?: string;
    interactionType?: string;
    [key: string]: any;
  }>;
}

interface Interaction {
  interactionType: string;
  name: string;
  [key: string]: any;
}

interface NDCItem {
  ndc: string;
}

interface InteractionGroup {
  interactionType: Interaction[];
}

interface PropertiesData {
  properties?: {
    name?: string;
    synonym?: string;
    [key: string]: any;
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { brand_name } = body;
    console.log("Request received for medicine:", brand_name);

    if (!brand_name) {
      return new Response(
        JSON.stringify({
          error: "Brand name is required",
          data: { results: [] },
          source: "error"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize input - basic sanitization
    const sanitizedName = brand_name.trim();

    // Helper function for FDA API fetch with retry logic
    const fetchWithRetry = async (url: string, retries = 2) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        console.log(`Attempting FDA API request (${retries} retries left)`);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        if (retries > 0) {
          console.log(`Retrying FDA API, ${retries} attempts left`);
          return fetchWithRetry(url, retries - 1);
        }
        throw error;
      }
    };

    // First try FDA API
    console.log("Attempting to fetch from FDA API...");
    const FDA_API_URL = `https://api.fda.gov/drug/label.json?search=brand_name:"${encodeURIComponent(
      sanitizedName
    )}"&limit=1`;

    try {
      const fdaResponse = await fetchWithRetry(FDA_API_URL);

      if (fdaResponse.ok) {
        const fdaData = await fdaResponse.json();
        console.log("Successfully fetched from FDA API");
        return new Response(
          JSON.stringify({
            message: "Success from FDA API",
            data: fdaData,
            source: "fda"
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } else {
        console.log("FDA API returned non-OK status:", fdaResponse.status);
        // Continue to RxNav fallback
      }
    } catch (fdaError: unknown) {
      console.error("FDA API fetch failed:", {
        message: fdaError instanceof Error ? fdaError.message : "Unknown error",
        name: fdaError instanceof Error ? fdaError.name : "Unknown"
      });
      // Continue to RxNav fallback
    }

    // Fallback to RxNav API
    console.log("Falling back to RxNav API...");
    
    // Helper function for RxNav API fetch with timeout
    const fetchWithTimeout = async (url: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        throw error;
      }
    };
    
    // Step 1: Search for the drug to get its RxCUI identifier
    try {
      const searchUrl = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(sanitizedName)}`;
      const searchResponse = await fetchWithTimeout(searchUrl);
      
      if (!searchResponse.ok) {
        throw new Error(`RxNav search failed with status: ${searchResponse.status}`);
      }
      
      const searchData = await searchResponse.json();
      console.log("RxNav search response received");
      
      // Check if we found any matching drugs
      if (!searchData.drugGroup?.conceptGroup || searchData.drugGroup.conceptGroup.length === 0) {
        return new Response(
          JSON.stringify({
            message: "No medication found with that name",
            data: { results: [] },
            source: "rxnav"
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Find a concept group with drugs
      let rxcui = null;
      for (const group of searchData.drugGroup.conceptGroup) {
        if (group.conceptProperties && group.conceptProperties.length > 0) {
          rxcui = group.conceptProperties[0].rxcui;
          break;
        }
      }
      
      if (!rxcui) {
        return new Response(
          JSON.stringify({
            message: "Could not find RxCUI for the medication",
            data: { results: [] },
            source: "rxnav"
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Step 2: Get detailed information about the drug using its RxCUI
      const ndcUrl = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`;
      const interactionUrl = `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${rxcui}`;
      const propertiesUrl = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`;
      
      // Make parallel requests for efficiency with proper error handling
      try {
        // Make parallel requests with timeout for each
        const [ndcResponse, interactionResponse, propertiesResponse] = await Promise.all([
          fetchWithTimeout(ndcUrl),
          fetchWithTimeout(interactionUrl),
          fetchWithTimeout(propertiesUrl)
        ]);
        
        // Process the responses
        let ndcData = { ndcGroup: { ndcList: [] } };
        if (ndcResponse.ok) {
          try {
            ndcData = await ndcResponse.json();
          } catch (e) {
            console.error("Failed to parse NDC data:", e);
          }
        }
        
        let interactionData = { interactionTypeGroup: [] };
        if (interactionResponse.ok) {
          try {
            interactionData = await interactionResponse.json();
          } catch (e) {
            console.error("Failed to parse interaction data:", e);
          }
        }
        
        let propertiesData: PropertiesData = { properties: {} };
        if (propertiesResponse.ok) {
          try {
            propertiesData = await propertiesResponse.json() as PropertiesData;
          } catch (e) {
            console.error("Failed to parse properties data:", e);
          }
        }
        
        console.log("All RxNav data fetched successfully");
        
        // Initialize arrays
        let spl_id_list: string[] = [];
        let interactions: Interaction[] = [];

        // Process NDC data
        if (ndcData?.ndcGroup?.ndcList) {
          const ndcList = Array.isArray(ndcData.ndcGroup.ndcList) 
            ? ndcData.ndcGroup.ndcList 
            : [ndcData.ndcGroup.ndcList];
          
          spl_id_list = ndcList
            .map((item: NDCItem) => item.ndc)
            .filter((ndc: string) => ndc);
        }

        // Process interaction data
        if (interactionData?.interactionTypeGroup) {
          try {
            const interactionGroups = Array.isArray(interactionData.interactionTypeGroup)
              ? interactionData.interactionTypeGroup
              : [interactionData.interactionTypeGroup];

            interactions = interactionGroups
              .flatMap((group: InteractionGroup) => group.interactionType || [])
              .filter((interaction: Interaction) => interaction.interactionType);
          } catch (error) {
            console.error('Error processing interactions:', error);
          }
        }
        
        // Construct a response format that mimics the FDA API for compatibility
        const formattedResult = {
          results: [{
            openfda: {
              brand_name: [propertiesData.properties?.name ?? sanitizedName],
              generic_name: [propertiesData.properties?.synonym ?? ""],
              rxcui: [rxcui],
              spl_id: spl_id_list
            },
            purpose: [propertiesData.properties?.name ?? ""],
            indications_and_usage: ["Please consult with your healthcare provider for specific usage information."],
            warnings: ["Information provided is for reference only. Consult with a healthcare professional before use."],
            active_ingredient: [propertiesData.properties?.name ?? ""],
            inactive_ingredient: [],
            interactions: interactions,
            rxnav_data: {
              properties: propertiesData.properties || {},
              ndcs: ndcData.ndcGroup?.ndcList || [],
              interactions: interactionData.interactionTypeGroup || []
            }
          }]
        };
        
        return new Response(
          JSON.stringify({
            message: "Success from RxNav API (FDA API fallback)",
            data: formattedResult,
            source: "rxnav"
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } catch (parallelFetchError: unknown) {
        console.error("Error during parallel RxNav API requests:", {
          message: parallelFetchError instanceof Error ? parallelFetchError.message : "Unknown error"
        });
        
        // Even if we have errors, try to return minimal information
        const formattedResult = {
          results: [{
            openfda: {
              brand_name: [sanitizedName],
              generic_name: [""],
              rxcui: [rxcui],
              spl_id: []
            },
            purpose: [""],
            indications_and_usage: ["Please consult with your healthcare provider for specific usage information."],
            warnings: ["Information provided is for reference only. Consult with a healthcare professional before use."],
            active_ingredient: [""],
            inactive_ingredient: [],
            interactions: [],
            rxnav_data: {
              properties: {},
              ndcs: [],
              interactions: []
            }
          }]
        };
        
        return new Response(
          JSON.stringify({
            message: "Partial data from RxNav API (errors occurred)",
            data: formattedResult,
            source: "rxnav",
            error: parallelFetchError instanceof Error ? parallelFetchError.message : "Unknown error"
          }),
          { status: 206, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (rxNavError: unknown) {
      console.error("RxNav API fetch failed:", {
        message: rxNavError instanceof Error ? rxNavError.message : "Unknown error"
      });
      
      // Both APIs failed - return a structured error response with empty results array
      // This ensures consistent data structure for the frontend
      return new Response(
        JSON.stringify({
          message: "Failed to retrieve medication information from both FDA and RxNav APIs",
          error: rxNavError instanceof Error ? rxNavError.message : "Unknown RxNav error",
          data: { results: [] },
          source: "error"
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in FDA API:', err);
    return new Response(
      JSON.stringify({
        error: 'Failed to process FDA data',
        details: err.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};




// import type { APIRoute } from "astro";
// export const prerender = false;

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const body = await request.json();

//     if (!body.brand_name) {
//       return new Response(
//         JSON.stringify({
//           message: "Error: Medicine name is required in request body",
//         }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Construct FDA API URL with the medicine name
//     const FDA_API_URL = `https://api.fda.gov/drug/label.json?search=brand_name=${encodeURIComponent(
//       body.brand_name
//     )}&limit=1`;

//     // Fetch data from FDA API
//     const response = await fetch(FDA_API_URL);
//     const data = await response.json();

//     // Return the FDA API response
//     return new Response(
//       JSON.stringify({
//         message: "Success",
//         data: data,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         message: "Error processing request",
//         error: error instanceof Error ? error.message : "Unknown error",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// };
