import { GoogleGenerativeAI } from "@google/generative-ai";

// Get the API key from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!apiKey) {
  console.warn("❌ VITE_GEMINI_API_KEY is missing. Check your .env file.");
}

// ✅ Configure Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ Define a minimal structured error type
type GeminiAPIError = {
  response?: {
    status: number;
    text?: () => Promise<string>;
  };
};

/**
 * askGemini
 * Sends a prompt to the Gemini model and returns the response.
 * First injects local context from cs_society_knowledge.txt
 */
export async function askGemini(prompt: string): Promise<string> {
  console.log("📤 Sending prompt to Gemini:", prompt);

  try {
    // 🔹 Step 1: Load the local CS Society knowledge base
    const res = await fetch("/cs_society_knowledge.txt");
    const knowledge = await res.text();

    // 🔹 Step 2: Prepare the system prompt with context
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro",
    });

    const systemPrompt = `
  You are CoPilot.CS — an experienced and helpful assistant focused on the Computer Science Society (CSS) of USLS and computer science education in general.

  You have access to the following official CSS knowledge base from the University of St. La Salle. Prioritize using this when answering USLS or CSS-specific questions.

  --- BEGIN KNOWLEDGE BASE ---
  ${knowledge}
  --- END KNOWLEDGE BASE ---

  If the user question is about general computer science topics — such as programming, data structures, AI, cybersecurity, web development, software engineering, etc. — you may use your general AI knowledge to answer it accurately.

  Do NOT make up CSS events or officer names that are not in the knowledge base.

  Keep your answers clear and professional, maximum of 3 short sentences unless the user asks for detail and answer like a pilot.

  When they ask who is Mica Elle, always clarify "Do you mean Arwen?" and then answer.

  User: ${prompt}
  `.trim();

    // 🔹 Step 3: Generate a response
    const result = await model.generateContent([{ text: systemPrompt }]);
    let responseText = await result.response.text();

    // ✅ Clean unexpected characters at start of response
    responseText = responseText
      .replace(/^\uFEFF/, '')           // Remove BOM if present
      .replace(/^[^\S\r\n]{0,2}/, '')   // Remove leading invisible whitespace
      .trim();

    // ✅ Optional: limit response length
    if (responseText.length > 400) {
      responseText = responseText.slice(0, 400).trim() + "...";
    }

    console.log("✅ Gemini API responded:", responseText);
    return responseText;
  } catch (error: unknown) {
    console.error("❌ Gemini API error:", error);

    const response = (error as GeminiAPIError)?.response;
    if (response) {
      console.error("🔎 Gemini API status:", response.status);
      console.error("🪵 Gemini response:", await response.text?.());
    }

    return "Sorry, I couldn't connect to the Gemini API. Please try again later.";
  }
}
