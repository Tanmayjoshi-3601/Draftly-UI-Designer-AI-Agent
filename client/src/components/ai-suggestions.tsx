import { Card } from "@/components/ui/card";
import { Bot, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AISuggestionsProps {
  suggestions: string[];
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Bot className="text-purple-500 mr-2 h-4 w-4" />
          <h3 className="text-sm font-medium">AI Suggestions</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      </div>
      
      <Card className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 p-3 text-sm text-gray-700 dark:text-gray-200">
        <p className="mb-2"><span className="font-medium">Consider these improvements:</span></p>
        <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-300 text-xs">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
