import { useState } from "react";
import { GeneratedDesignResponse } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface CodeViewProps {
  design: GeneratedDesignResponse;
}

export default function CodeView({ design }: CodeViewProps) {
  const [codeTab, setCodeTab] = useState("tailwind");
  
  return (
    <div className="w-full h-full p-4">
      <Tabs 
        defaultValue="tailwind" 
        value={codeTab} 
        onValueChange={setCodeTab}
        className="w-full h-full flex flex-col"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="tailwind">React + Tailwind</TabsTrigger>
          <TabsTrigger value="jsx">React JSX</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tailwind" className="flex-1 h-full mt-0">
          <CodeBlock code={design.tailwind} language="jsx" />
        </TabsContent>
        
        <TabsContent value="jsx" className="flex-1 h-full mt-0">
          <CodeBlock code={design.jsx} language="jsx" />
        </TabsContent>
        
        <TabsContent value="html" className="flex-1 h-full mt-0">
          <CodeBlock code={design.html} language="html" />
        </TabsContent>
        
        <TabsContent value="css" className="flex-1 h-full mt-0">
          <CodeBlock code={design.css} language="css" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  // In a real implementation, we would use a syntax highlighter like prism.js or highlight.js
  // For simplicity in this example, we'll use a basic styling
  
  return (
    <Card className="h-full overflow-auto">
      <pre className="p-4 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 h-full overflow-auto">
        <code>{code}</code>
      </pre>
    </Card>
  );
}
