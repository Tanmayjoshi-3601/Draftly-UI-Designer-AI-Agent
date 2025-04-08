import { useState } from "react";
import { GeneratedDesignResponse } from "@shared/schema";
import { generateDesignDirectly } from "@/lib/openai";

export interface AdvancedSettings {
  layoutStyle: string;
  colorTheme: string;
  includeHoverStates: boolean;
  darkModeSupport: boolean;
  includeAccessibility: boolean;
  includeAnimations: boolean;
  outputFormat: string;
}

export function useDesignGenerator() {
  const [prompt, setPrompt] = useState<string>("A dashboard with a sidebar, navbar, and analytics cards showing user statistics, recent activities, and a chart displaying weekly engagement metrics.");
  const [generatedDesign, setGeneratedDesign] = useState<GeneratedDesignResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    layoutStyle: "responsive",
    colorTheme: "default",
    includeHoverStates: true,
    darkModeSupport: true,
    includeAccessibility: false,
    includeAnimations: false,
    outputFormat: "react-tailwind",
  });
  
  const updateSetting = (key: keyof AdvancedSettings, value: any) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const resetSettings = () => {
    setAdvancedSettings({
      layoutStyle: "responsive",
      colorTheme: "default",
      includeHoverStates: true,
      darkModeSupport: true,
      includeAccessibility: false,
      includeAnimations: false,
      outputFormat: "react-tailwind",
    });
  };
  
  const generateDesign = async () => {
    setIsGenerating(true);
    
    try {
      // Call the OpenAI API to generate the design
      const design = await generateDesignDirectly(prompt, advancedSettings);
      setGeneratedDesign(design);
      return design;
    } catch (error) {
      console.error("Error generating design:", error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    prompt,
    setPrompt,
    advancedSettings,
    updateSetting,
    resetSettings,
    generatedDesign,
    isGenerating,
    generateDesign,
  };
}
