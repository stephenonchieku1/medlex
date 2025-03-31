import Together from 'together-ai';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      medicineName,
      purposeText,
      indicationsText,
      warningsText,
      patientInfoText,
      storageText,
      inactiveIngredients,
      activeIngredients,
      structuredProductLabeling,
      userSettings
    } = body;
    const together = new Together({
      apiKey: "d24d8d76186093aa83f4fcfbea3746ed5ede9d7fd303ebb78d76e259ccffd831"
    });
    const systemPrompt = `You are a knowledgeable medical assistant. Analyze the provided medication information for side effects and herbal alternatives. 

IMPORTANT: Respond ONLY with a JSON object. Do not include any additional text, markdown formatting, or code blocks.
Here are the user settings: ${userSettings} you have to follow these settings to answer the question.
The JSON response must follow this exact structure:
{
  "side_effects": {
    "common": ["effect1", "effect2"],
    "serious": ["effect1", "effect2"],
    "rare": ["effect1", "effect2"]
  },
  "herbal_alternatives": {
    "options": [
      {
        "name": "string",
        "benefits": "string",
        "warnings": "string"
      }
    ],
    "disclaimer": "string"
  }
}`;
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Analyze this medication:
            Medicine Name: ${medicineName}
            Purpose: ${purposeText}
            Indications: ${indicationsText}
            Warnings: ${warningsText}
            Patient Info: ${patientInfoText}
            Storage Information: ${storageText}
            Active Ingredients: ${JSON.stringify(activeIngredients)}
            Inactive Ingredients: ${JSON.stringify(inactiveIngredients)}
            Structured Product Labeling: ${JSON.stringify(
            structuredProductLabeling
          )}`
        }
      ],
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
      max_tokens: 1500,
      temperature: 0.7
    });
    const aiResponse = response.choices?.[0]?.message?.content;
    let analysisData = null;
    try {
      analysisData = aiResponse ? JSON.parse(aiResponse) : null;
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Error parsing AI response",
          error: "Invalid JSON response from AI"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          sideEffects: analysisData.side_effects,
          herbalAlternatives: analysisData.herbal_alternatives
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
