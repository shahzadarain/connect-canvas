import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Scale } from "lucide-react";
import { AITool } from '@/integrations/supabase/types/ai-tools';

interface AIToolCardProps {
  tool: AITool['Row'];
  viewMode: 'grid' | 'list';
  isSaved: boolean;
  isCompared: boolean;
  onSave: (id: number) => void;
  onCompare: (tool: AITool['Row']) => void;
}

const AIToolCard = ({
  tool,
  viewMode,
  isSaved,
  isCompared,
  onSave,
  onCompare
}: AIToolCardProps) => {
  return (
    <Card 
      className={`
        group overflow-hidden transition-all duration-300 hover:shadow-lg
        ${viewMode === 'grid' ? 'h-full' : 'w-full'}
        animate-fade-in bg-card hover:scale-[1.02]
      `}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-card-foreground">{tool.name}</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(tool.id)}
              className={`
                transition-colors duration-300
                ${isSaved ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400 hover:text-gray-500'}
              `}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCompare(tool)}
              className={`
                transition-colors duration-300
                ${isCompared ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'}
              `}
            >
              <Scale className={`w-5 h-5 ${isCompared ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tool.category && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
              {tool.category}
            </span>
          )}
          {tool.pricing_type && (
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
              {tool.pricing_type}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AIToolCard;