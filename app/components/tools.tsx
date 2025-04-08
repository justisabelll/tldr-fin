'use client';

import { useState } from 'react';
interface Tool {
  name: string;
  description: string;
  component: React.ComponentType;
}

const tools: Tool[] = [
  {
    name: 'company 101',
    description: 'find out what a company does',
    component: WhatIsTool,
  },
];

export function ToolsPicker() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  function handleToolClick(
    currentTool: Tool,
    setSelectedTool: (tool: Tool | null) => void
  ) {
    if (currentTool === selectedTool) {
      setSelectedTool(null);
    } else {
      setSelectedTool(currentTool);
    }
  }
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto pb-8">
      {tools.map((tool) => (
        <div
          key={tool.name}
          onClick={() => handleToolClick(tool, setSelectedTool)}
          className="border border-stone-700 hover:cursor-pointer p-6 sm:p-8 rounded-lg bg-stone-800 hover:bg-stone-700 transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] h-40 flex flex-col justify-between shadow-md hover:shadow-lg hover:translate-y-[-2px]"
        >
          <h2 className="text-xl sm:text-2xl font-bold">{tool.name}</h2>
          <p className="text-sm mt-2 text-gray-300">{tool.description}</p>
          {selectedTool === tool && (
            <div className="mt-4">
              <tool.component />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function WhatIsTool() {
  return (
    <div>
      <h1>What is ___?</h1>
    </div>
  );
}
