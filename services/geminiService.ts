import { GoogleGenAI } from "@google/genai";
import { ImageStyle, AspectRatio } from "../types";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini Flash to rewrite and optimize the user's prompt.
 * This handles translation from Arabic to English and adds artistic details.
 */
async function enhancePrompt(prompt: string, style: ImageStyle): Promise<string> {
  try {
    const systemInstruction = `You are an expert AI image prompt specialist. 
    Your task is to translate the user's input to English (if in Arabic or other languages) and refine it into a high-quality image generation prompt.
    
    Rules:
    1. If the input is in Arabic, translate it accurately to English first.
    2. Add descriptive details about lighting, texture, and composition that match the requested style: "${style}".
    3. Keep the prompt concise (under 70 words) but vivid.
    4. Return ONLY the enhanced prompt text. Do not add quotation marks or labels.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const enhanced = response.text?.trim();
    console.log(`Original: ${prompt} -> Enhanced: ${enhanced}`);
    return enhanced || prompt;
  } catch (error) {
    console.error("Prompt enhancement failed:", error);
    // Fallback to simple concatenation if LLM fails
    if (style !== ImageStyle.NONE) {
      return `${prompt}, in ${style} style, high quality, 4k detail`;
    }
    return prompt;
  }
}

/**
 * Generates an image using the Imagen 3 model.
 * 
 * @param prompt The user's text description.
 * @param style The selected visual style.
 * @param aspectRatio The desired aspect ratio.
 * @returns A base64 data URL of the generated image.
 */
export const generateImage = async (
  prompt: string,
  style: ImageStyle,
  aspectRatio: AspectRatio
): Promise<string> => {
  try {
    // Step 1: Optimize the prompt using Gemini Flash
    // This ensures Arabic prompts are understood and styles are applied semantically
    const finalPrompt = await enhancePrompt(prompt, style);

    // Step 2: Generate the image using Imagen 3
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No image was generated. Please try a different prompt.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
    
    return imageUrl;

  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    let errorMessage = "Failed to generate image.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    // Handle specific safety blocks or API errors if needed
    if (errorMessage.includes("Safety")) {
        errorMessage = "The prompt triggered safety filters. Please modify your description.";
    }
    throw new Error(errorMessage);
  }
};