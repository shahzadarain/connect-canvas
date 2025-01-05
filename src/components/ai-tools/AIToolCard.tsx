import React from 'react';
import { ExternalLink, Save, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AITool } from '@/integrations/supabase/types/ai-tools';

interface AIToolCardProps {
  tool: AITool['Row'];
  viewMode: 'grid' | 'list';
  isSaved: boolean;
  isCompared: boolean;
  onSave: (toolId: number) => void;
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
    <div
      className={`group transition-all duration-300 ${
        viewMode === 'grid'
          ? 'bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1'
          : 'flex gap-4 bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg'
      }`}
    >
      <div className={`${viewMode === 'grid' ? 'aspect-video' : 'w-48'} bg-gray-100 dark:bg-gray-900 relative`}>
        {tool.image_url ? (
          <img
            src={tool.image_url}
            alt={tool.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>
      
      <div className={`${viewMode === 'grid' ? 'p-6' : 'flex-1'}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
            {tool.name}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(tool.id)}
              className={`${isSaved ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Save className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCompare(tool)}
              className={`${isCompared ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <ArrowUpDown className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {tool.category && (
          <div className="mb-2">
            <span className="text-sm px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              {tool.category}
            </span>
          </div>
        )}
        
        {tool.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {tool.description}
          </p>
        )}

        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
          >
            Learn More
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default AIToolCard;