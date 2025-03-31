import { ImageAnnotatorClient } from '@google-cloud/vision';
export { renderers } from '../../renderers.mjs';

const credentials = JSON.parse("{") ;
const prerender = false;
const MEDICINE_INDICATORS = [
  "mg",
  "tablet",
  "capsule",
  "tablets",
  "capsules",
  "prescription",
  "drug",
  "medicine",
  "pharmaceutical",
  "dose",
  "dosage",
  "active ingredient",
  "rx",
  "oral",
  "injection",
  "suspension",
  "antibiotic",
  "ointment",
  "cream",
  "lotion",
  "solution",
  "syrup",
  "extended release",
  "immediate release"
];
const MEDICATION_SUFFIXES = [
  "cin",
  "zole",
  "mycin",
  "vir",
  "azole",
  "olol",
  "pril",
  "sartan",
  "statin",
  "prazole",
  "tide",
  "mab",
  "zumab",
  "ximab",
  "tinib",
  "vastatin",
  "parin",
  "oxacin",
  "triptan"
];
const POST = async ({ request }) => {
  try {
    const { imageUrl } = await request.json();
    if (!imageUrl) {
      return new Response("Image URL is required", { status: 400 });
    }
    const visionClient = new ImageAnnotatorClient({
      credentials
    });
    const [result] = await visionClient.annotateImage({
      image: { content: imageUrl.split(",")[1] },
      // Remove data:image/jpeg;base64, prefix
      features: [
        { type: "TEXT_DETECTION" },
        { type: "OBJECT_LOCALIZATION" },
        { type: "LOGO_DETECTION" },
        { type: "LABEL_DETECTION", maxResults: 10 },
        { type: "DOCUMENT_TEXT_DETECTION" }
        // Better for text on packaging
      ]
    });
    const fullText = result.fullTextAnnotation?.text || "";
    const textBlocks = result.textAnnotations?.slice(1) || [];
    const scoreMedicineName = (text) => {
      let score = 0;
      const lowerText = text.toLowerCase();
      if (MEDICINE_INDICATORS.some(
        (indicator) => fullText.toLowerCase().includes(`${lowerText} ${indicator}`) || fullText.toLowerCase().includes(`${indicator} ${lowerText}`)
      )) {
        score += 5;
      }
      if (MEDICATION_SUFFIXES.some((suffix) => lowerText.endsWith(suffix))) {
        score += 3;
      }
      if (/^[A-Z][a-z]+$/.test(text)) {
        score += 2;
      }
      if (fullText.toLowerCase().includes(`${lowerText} tablets`) || fullText.toLowerCase().includes(`${lowerText} capsules`) || fullText.toLowerCase().includes(`${lowerText} mg`)) {
        score += 4;
      }
      if (text.length > 3 && text.length < 20) {
        score += 1;
      }
      const genericWords = ["the", "and", "for", "with", "from", "this", "that", "each", "take"];
      if (genericWords.includes(lowerText)) {
        score -= 10;
      }
      return score;
    };
    const potentialMedicineNames = textBlocks.filter((block) => {
      const text = block.description?.toLowerCase() || "";
      return text.length > 2 && // Not too short
      !/^\d+$/.test(text) && // Not just numbers
      !/^[0-9.]+\s*mg$/.test(text);
    }).map((block) => ({
      name: block.description || "",
      score: scoreMedicineName(block.description || "")
    })).sort((a, b) => b.score - a.score).filter((item) => item.score > 0).map((item) => item.name);
    const pharmacyLogos = result.logoAnnotations?.filter((logo) => {
      const name = logo.description?.toLowerCase() || "";
      return name.includes("pharm") || name.includes("drug") || name.includes("rx") || name.includes("health");
    }).map((logo) => logo.description) || [];
    const medicationLabels = result.labelAnnotations?.filter((label) => {
      const desc = label.description?.toLowerCase() || "";
      return desc.includes("pill") || desc.includes("medicine") || desc.includes("drug") || desc.includes("capsule") || desc.includes("tablet") || desc.includes("medication") || desc.includes("pharmacy");
    }).map((label) => label.description) || [];
    const response = {
      medicineName: potentialMedicineNames[0] || "",
      // Best guess for medicine name
      alternativeNames: potentialMedicineNames.slice(1, 5),
      // Other potential names, limited to top 5
      fullText,
      objects: result.localizedObjectAnnotations?.map((obj) => obj.name) || [],
      logos: result.logoAnnotations?.map((logo) => logo.description) || [],
      labels: result.labelAnnotations?.map((label) => label.description) || [],
      isMedication: medicationLabels.length > 0 || pharmacyLogos.length > 0,
      confidence: potentialMedicineNames.length > 0 ? "high" : "low"
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to analyze image",
        details: error instanceof Error ? error.message : "Unknown error"
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
