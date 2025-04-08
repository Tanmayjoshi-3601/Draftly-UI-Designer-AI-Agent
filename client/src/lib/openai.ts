import { GeneratedDesignResponse } from "@shared/schema";

// This is a client-side wrapper for OpenAI API

export async function generateDesignWithOpenAI(
  prompt: string,
  options: {
    layoutStyle?: string;
    colorTheme?: string;
    includeHoverStates?: boolean;
    darkModeSupport?: boolean;
    includeAccessibility?: boolean;
    includeAnimations?: boolean;
    outputFormat?: string;
  }
): Promise<GeneratedDesignResponse> {
  try {
    // Call our backend API which accesses OpenAI with proper authentication
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, options }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate design");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating design with OpenAI:", error);
    throw error;
  }
}

// This function is now just an alias to generateDesignWithOpenAI,
// since we're implementing the real OpenAI service in the backend
export function generateDesignDirectly(
  prompt: string,
  options: {
    layoutStyle?: string;
    colorTheme?: string;
    includeHoverStates?: boolean;
    darkModeSupport?: boolean;
    includeAccessibility?: boolean;
    includeAnimations?: boolean;
    outputFormat?: string;
  }
): Promise<GeneratedDesignResponse> {
  return generateDesignWithOpenAI(prompt, options);
}
