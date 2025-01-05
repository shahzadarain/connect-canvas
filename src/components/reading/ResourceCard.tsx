import { BookOpen, Headphones, FileText, ExternalLink } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  author: string | null;
  type: string;
  external_url: string | null;
  category: string | null;
  description?: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'audio':
      return <Headphones className="w-5 h-5" />;
    case 'pdf':
      return <FileText className="w-5 h-5" />;
    case 'external_link':
      return <ExternalLink className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <a
      href={resource.external_url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
            {resource.title}
          </h3>
          {resource.author && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              by {resource.author}
            </p>
          )}
        </div>
        <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
          {getResourceIcon(resource.type)}
          <span className="hidden md:inline capitalize ml-1">
            {resource.type}
          </span>
        </span>
      </div>
      
      {resource.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {resource.description}
        </p>
      )}

      {resource.category && (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {resource.category}
          </span>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 group-hover:text-blue-600 transition-colors">
          Access Resource
          <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
};