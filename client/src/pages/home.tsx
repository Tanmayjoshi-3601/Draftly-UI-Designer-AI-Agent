import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import PromptPanel from "@/components/prompt-panel";
import PreviewPanel from "@/components/preview-panel";
import { useDesignGenerator } from "@/hooks/use-design-generator";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [activeProject, setActiveProject] = useState("Modern Dashboard");
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const { toast } = useToast();
  
  const {
    prompt,
    setPrompt,
    advancedSettings,
    updateSetting,
    resetSettings,
    generatedDesign,
    isGenerating,
    generateDesign,
  } = useDesignGenerator();

  const handleGenerateDesign = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a design prompt to generate a UI.",
        variant: "destructive",
      });
      return;
    }

    try {
      await generateDesign();
      toast({
        title: "Design Generated",
        description: "Your UI design has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate design. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Sidebar 
          activeProject={activeProject}
          onSelectProject={setActiveProject}
        />
        
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <PromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            onGenerate={handleGenerateDesign}
            advancedSettings={advancedSettings}
            updateSetting={updateSetting}
            resetSettings={resetSettings}
          />
          
          <PreviewPanel
            design={generatedDesign}
            isLoading={isGenerating}
            viewMode={viewMode}
            setViewMode={setViewMode}
            deviceView={deviceView}
            setDeviceView={setDeviceView}
          />
        </div>
      </main>
    </div>
  );
}
