import React from 'react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <div className="my-8 animate-fade-in group">
      <div className="bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-mono text-gray-300 dark:text-gray-400">
          {language}
        </span>
      </div>
      <pre className="bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 border-t-0 rounded-b-lg p-4 overflow-x-auto group-hover:border-gray-600 transition-colors">
        <code className="text-gray-200 dark:text-gray-300 whitespace-pre font-mono text-sm">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};