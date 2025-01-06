import React from 'react';
import { Code } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <div className="my-8 animate-fade-in group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
            {language}
          </span>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-800 m-0">
        <code className="text-gray-800 dark:text-gray-200 whitespace-pre font-mono text-sm">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};