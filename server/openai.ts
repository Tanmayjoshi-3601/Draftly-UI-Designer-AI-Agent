import OpenAI from "openai";
import { GeneratedDesignResponse } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompt template for generating UI designs
const createPrompt = (
  userPrompt: string,
  options: {
    layoutStyle?: string;
    colorTheme?: string;
    includeHoverStates?: boolean;
    darkModeSupport?: boolean;
    includeAccessibility?: boolean;
    includeAnimations?: boolean;
    outputFormat?: string;
  }
) => {
  // Set default options
  const {
    layoutStyle = "responsive",
    colorTheme = "default",
    includeHoverStates = true,
    darkModeSupport = true,
    includeAccessibility = true,
    includeAnimations = false,
    outputFormat = "react-tailwind",
  } = options;

  // Build a detailed prompt for the AI
  return `
You are a world-class UI/UX designer who specializes in creating modern, visually appealing, and highly usable web interfaces.

User Request: "${userPrompt}"

Please design a user interface based on the above request with the following specifications:
- Layout Style: ${layoutStyle}
- Color Theme: ${colorTheme}
${includeHoverStates ? "- Include hover states" : ""}
${darkModeSupport ? "- Support dark mode" : ""}
${includeAccessibility ? "- Implement accessibility best practices" : ""}
${includeAnimations ? "- Add subtle animations" : ""}
- Output Format: ${outputFormat}

Your response should contain the following sections:
1. HTML - Semantic HTML structure with appropriate tags
2. CSS - Clean, well-organized CSS including responsive design
3. JSX - React component version using standard React practices
4. Tailwind - React component using Tailwind CSS classes
5. Suggestions - 5 concise suggestions to improve the design

Format your response as valid JSON with the following structure:
{
  "html": "<!-- Complete HTML code -->",
  "css": "/* Complete CSS code */",
  "jsx": "// Complete React JSX code",
  "tailwind": "// Complete React + Tailwind code",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4", "suggestion5"]
}

Make sure all code is complete, properly formatted, and ready to use without modifications.
Ensure the design is modern, clean, and follows current best practices.
`;
};

// Function to generate UI designs using OpenAI
export async function generateDesign(
  prompt: string,
  options: {
    layoutStyle?: string;
    colorTheme?: string;
    includeHoverStates?: boolean;
    darkModeSupport?: boolean;
    includeAccessibility?: boolean;
    includeAnimations?: boolean;
    outputFormat?: string;
  } = {}
): Promise<GeneratedDesignResponse> {
  try {
    // Create the detailed prompt for the AI
    const fullPrompt = createPrompt(prompt, options);

    console.log("Sending request to OpenAI...");
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released after your knowledge cutoff. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: "You are an expert UI/UX designer and front-end developer." },
        { role: "user", content: fullPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    // Get the response content
    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    // Parse the JSON response
    const data = JSON.parse(content) as GeneratedDesignResponse;
    console.log("Received design from OpenAI");
    
    return data;
  } catch (error) {
    console.error("Error generating design with OpenAI:", error);
    throw error;
  }
}