import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WandSparkles, Save, Trash2, BookOpen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AdvancedSettings {
  layoutStyle: string;
  colorTheme: string;
  includeHoverStates: boolean;
  darkModeSupport: boolean;
  includeAccessibility: boolean;
  includeAnimations: boolean;
  outputFormat: string;
}

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  advancedSettings: AdvancedSettings;
  updateSetting: (key: keyof AdvancedSettings, value: any) => void;
  resetSettings: () => void;
}

export default function PromptPanel({
  prompt,
  setPrompt,
  isGenerating,
  onGenerate,
  advancedSettings,
  updateSetting,
  resetSettings,
}: PromptPanelProps) {
  return (
    <div className="w-full lg:w-1/2 h-72 lg:h-auto border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Design Prompt</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" title="Save prompt">
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Clear prompt">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Example prompts">
              <BookOpen className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <Textarea
          className="w-full h-full p-3 resize-none"
          placeholder="Describe the UI you want to create. For example: 'A modern dashboard with a sidebar, navbar, and analytics cards with charts...'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            disabled={isGenerating}
            onClick={onGenerate}
          >
            <WandSparkles className="mr-1.5 h-4 w-4" />
            <span>{isGenerating ? "Generating..." : "Generate Design"}</span>
          </Button>
          
          <div className="flex-1 w-full sm:w-auto">
            <Select
              value={advancedSettings.outputFormat}
              onValueChange={(value) => updateSetting("outputFormat", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select output format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react-tailwind">React + TailwindCSS</SelectItem>
                <SelectItem value="html-css">HTML + CSS</SelectItem>
                <SelectItem value="vue-tailwind">Vue + TailwindCSS</SelectItem>
                <SelectItem value="react-styled">React + Styled Components</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Settings Panel */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Advanced Settings</h3>
          <button 
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            onClick={resetSettings}
          >
            Reset to defaults
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="layoutStyle" className="text-sm">Layout Style</Label>
              <Select
                value={advancedSettings.layoutStyle}
                onValueChange={(value) => updateSetting("layoutStyle", value)}
              >
                <SelectTrigger id="layoutStyle" className="w-32 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="responsive">Responsive</SelectItem>
                  <SelectItem value="fixed">Fixed Width</SelectItem>
                  <SelectItem value="mobile">Mobile First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="colorTheme" className="text-sm">Color Theme</Label>
              <Select
                value={advancedSettings.colorTheme}
                onValueChange={(value) => updateSetting("colorTheme", value)}
              >
                <SelectTrigger id="colorTheme" className="w-32 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="vibrant">Vibrant</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hoverStates"
                checked={advancedSettings.includeHoverStates}
                onCheckedChange={(checked) => 
                  updateSetting("includeHoverStates", checked === true)
                }
              />
              <Label htmlFor="hoverStates" className="text-sm">Include hover states</Label>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="darkMode"
                checked={advancedSettings.darkModeSupport}
                onCheckedChange={(checked) => 
                  updateSetting("darkModeSupport", checked === true)
                }
              />
              <Label htmlFor="darkMode" className="text-sm">Dark mode support</Label>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accessibility"
                checked={advancedSettings.includeAccessibility}
                onCheckedChange={(checked) => 
                  updateSetting("includeAccessibility", checked === true)
                }
              />
              <Label htmlFor="accessibility" className="text-sm">Add accessibility features</Label>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="animations"
                checked={advancedSettings.includeAnimations}
                onCheckedChange={(checked) => 
                  updateSetting("includeAnimations", checked === true)
                }
              />
              <Label htmlFor="animations" className="text-sm">Include animations</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
