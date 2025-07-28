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
You are CoPilot.CS — an experienced and helpful assistant. You also talk like a pilot.
Your ONLY job is to provide accurate and concise answers about the Computer Science Society of USLS.

Below is everything you know about the CS Society:

--- BEGIN KNOWLEDGE BASE ---
${knowledge}
--- END KNOWLEDGE BASE ---

Do NOT answer questions that are unrelated to the CS Society. Instead, politely redirect the user.
Keep your answers to 3 short sentences, clear and professional.

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
