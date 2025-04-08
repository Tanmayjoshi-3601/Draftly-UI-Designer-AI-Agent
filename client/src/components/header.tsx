import { MoonIcon, SunIcon, Github, UserPlus } from "lucide-react";
import { WandSparkles } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <WandSparkles className="text-purple-600 h-6 w-6" />
                <span className="font-bold text-xl">Generative UI/UX Designer</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Github size={16} />
              <span>GitHub</span>
            </Button>
            
            <Button 
              size="sm" 
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus size={16} />
              <span>Sign Up</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
