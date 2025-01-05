import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Scale, ExternalLink } from "lucide-react";
import { AITool } from '@/integrations/supabase/types/ai-tools';
import Image from '@/components/ui/image';

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
      {tool.image_url && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={tool.image_url}
            alt={tool.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-card-foreground">
              {tool.url ? (
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors duration-200 flex items-center gap-2"
                >
                  {tool.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                tool.name
              )}
            </h3>
          </div>
          <div className="flex gap-2 ml-4">
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