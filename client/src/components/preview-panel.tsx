import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GeneratedDesignResponse } from "@shared/schema";
import { Monitor, Tablet, Smartphone, Copy, Download, Share2, RefreshCw } from "lucide-react";
import CodeView from "@/components/code-view";
import AISuggestions from "@/components/ai-suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface PreviewPanelProps {
  design: GeneratedDesignResponse | null;
  isLoading: boolean;
  viewMode: "visual" | "code";
  setViewMode: (mode: "visual" | "code") => void;
  deviceView: "desktop" | "tablet" | "mobile";
  setDeviceView: (device: "desktop" | "tablet" | "mobile") => void;
}

export default function PreviewPanel({
  design,
  isLoading,
  viewMode,
  setViewMode,
  deviceView,
  setDeviceView,
}: PreviewPanelProps) {
  const { toast } = useToast();
  const [iframeLoading, setIframeLoading] = useState(true);
  
  const handleCopyCode = () => {
    if (!design) return;
    
    let codeToCopy = "";
    switch (viewMode) {
      case "visual":
        codeToCopy = design.html;
        break;
      case "code":
        codeToCopy = design.tailwind; // Default to tailwind when in code view
        break;
    }
    
    navigator.clipboard.writeText(codeToCopy);
    toast({
      title: "Code Copied",
      description: "The generated code has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    if (!design) return;
    
    // In a real implementation, this would create a zip file with all the code
    toast({
      title: "Download Started",
      description: "Your code is being prepared for download.",
    });
  };
  
  const getPreviewContent = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </div>
        </div>
      );
    }
    
    if (!design) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-2">No design generated yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Enter a prompt and click "Generate Design" to create your UI
            </p>
          </div>
        </div>
      );
    }
    
    if (viewMode === "code") {
      return <CodeView design={design} />;
    }
    
    // Visual view
    const getDeviceClass = () => {
      switch (deviceView) {
        case "mobile": return "max-w-sm";
        case "tablet": return "max-w-md";
        default: return "w-full";
      }
    };
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en" class="${document.documentElement.classList.contains('dark') ? 'dark' : ''}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
        <style>
          ${design.css}
        </style>
      </head>
      <body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        ${design.html}
      </body>
      </html>
    `;
    
    return (
      <div className={`w-full h-full flex items-center justify-center transition-all duration-300 p-4 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`}>
        {iframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        )}
        <iframe
          className={`${getDeviceClass()} h-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-all duration-300`}
          srcDoc={htmlContent}
          onLoad={() => setIframeLoading(false)}
          sandbox="allow-scripts"
          title="Design Preview"
        />
      </div>
    );
  };
  
  return (
    <div className="w-full lg:w-1/2 flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
            <Button
              variant={viewMode === "visual" ? "default" : "ghost"}
              size="sm"
              className={`rounded-r-none ${viewMode === "visual" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""}`}
              onClick={() => setViewMode("visual")}
            >
              Visual
            </Button>
            <Button
              variant={viewMode === "code" ? "default" : "ghost"}
              size="sm"
              className={`rounded-l-none ${viewMode === "code" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""}`}
              onClick={() => setViewMode("code")}
            >
              Code
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {viewMode === "visual" && (
            <div className="flex items-center mr-2">
              <Button
                variant={deviceView === "desktop" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setDeviceView("desktop")}
                title="Desktop view"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === "tablet" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-none border-x border-gray-200 dark:border-gray-700"
                onClick={() => setDeviceView("tablet")}
                title="Tablet view"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === "mobile" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setDeviceView("mobile")}
                title="Mobile view"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" title="Copy code" onClick={handleCopyCode}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Download files" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Export to Figma">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 relative">
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          {getPreviewContent()}
        </div>
      </div>
      
      {design && design.suggestions && design.suggestions.length > 0 && (
        <AISuggestions suggestions={design.suggestions} />
      )}
    </div>
  );
}
