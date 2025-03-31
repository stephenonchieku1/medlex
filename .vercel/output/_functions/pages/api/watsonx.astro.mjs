import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';
export { renderers } from '../../renderers.mjs';

const watsonxAIService = WatsonXAI.newInstance({
  version: "2024-05-31",
  serviceUrl: "https://us-south.ml.cloud.ibm.com",
  authenticator: new IamAuthenticator({
    apikey: undefined                                      
    // OR WATSON_IAM_API_KEY!
  })
});

const prerender = false;
const validateMedicineData = (data) => {
  try {
    return data && data.fdaData?.data?.results?.length > 0 && data.sideEffectData?.data?.sideEffects && data.sideEffectData?.data?.herbalAlternatives?.options;
  } catch (e) {
    return false;
  }
};
const MEDICAL_SYSTEM_PROMPT = `
return the following information in the following format:
1. OVERVIEW
   - Primary Use
   - Drug Class
   - Key Benefits

2. SAFETY
   - Common Side Effects
   - Important Warnings
   - Drug Interactions

3. USAGE
   - Typical Dosing
   - Storage
   - Key Precautions

4. ALTERNATIVES
   - Natural Options
   - Important Notes
  constraints: Guidelines:
- Use clear language
- Prioritize safety
- Be concise
- Cite key warnings`;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!validateMedicineData(body)) {
      throw new Error("Invalid request data structure");
    }
    const { fdaData, sideEffectData, userSettings = "" } = body;
    const buildMedicineInfo = (fdaData2 = {}) => {
      const medicineDetails = fdaData2?.data?.results?.[0] || {};
      const medicineName = medicineDetails?.spl_product_data_elements?.[0]?.name_of_product || medicineDetails?.openfda?.brand_name?.[0] || medicineDetails?.openfda?.generic_name?.[0] || "Unknown Medicine";
      return {
        name: medicineName,
        purpose: medicineDetails?.purpose?.[0] || null,
        indications: medicineDetails?.indications_and_usage?.[0] || null,
        warnings: medicineDetails?.warnings?.[0] || null,
        patientInfo: medicineDetails?.patient_information?.[0] || null
      };
    };
    const formatSideEffects = (sideEffectData2 = {}) => {
      if (!sideEffectData2?.data?.sideEffects) return "";
      return Object.entries(sideEffectData2.data.sideEffects).map(([category, effects]) => {
        const categoryTitle = category.replace(/_/g, " ").toUpperCase();
        const effectsList = Array.isArray(effects) ? effects.join("\n- ") : "";
        return effectsList ? `${categoryTitle}:
${effectsList}` : "";
      }).filter(Boolean).join("\n\n");
    };
    const buildPrompt = (medicineInfo2, sideEffects2) => {
      const sections = [];
      sections.push(`Medicine Analysis Results for ${medicineInfo2.name}:`);
      const basicInfo = [
        ["Purpose", medicineInfo2.purpose],
        ["Indications", medicineInfo2.indications],
        ["Warnings", medicineInfo2.warnings],
        ["Patient Information", medicineInfo2.patientInfo]
      ].filter(([_, value]) => value !== null);
      if (basicInfo.length > 0) {
        sections.push("\nBasic Information:");
        sections.push(
          basicInfo.map(([key, value]) => `- ${key}: ${value}`).join("\n")
        );
      }
      if (sideEffects2) {
        sections.push("\nSide Effects:");
        sections.push(sideEffects2);
      }
      return sections.join("\n");
    };
    const textGeneration = async (input) => {
      const prompt = `System Instructions:
${MEDICAL_SYSTEM_PROMPT}

Medicine Data:
${input}

User Settings:
${userSettings}

Output:`;
      console.log("Prompt sent to Watson:", prompt);
      const response2 = await Promise.race([
        watsonxAIService.generateText({
          input: prompt,
          parameters: {
            decoding_method: "greedy",
            max_new_tokens: 3e3,
            min_new_tokens: 100,
            stop_sequences: ["<|endoftext|>"],
            repetition_penalty: 2,
            temperature: 0.8
          },
          modelId: "meta-llama/llama-3-405b-instruct",
          projectId: undefined                                 
        }),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Watson API timeout")), 3e4)
        )
      ]);
      return response2;
    };
    const medicineInfo = buildMedicineInfo(fdaData);
    const sideEffects = formatSideEffects(sideEffectData);
    const formattedPrompt = buildPrompt(
      medicineInfo,
      sideEffects
    );
    if (formattedPrompt.trim() === "") {
      throw new Error("No valid data provided");
    }
    const response = await textGeneration(formattedPrompt);
    if (!response?.result?.results?.[0]?.generated_text) {
      throw new Error("Invalid response from Watson");
    }
    return new Response(
      JSON.stringify({
        generatedText: response.result.results[0].generated_text
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: error instanceof Error && error.message.includes("Invalid request") ? 400 : 500,
        headers: { "Content-Type": "application/json" }
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
