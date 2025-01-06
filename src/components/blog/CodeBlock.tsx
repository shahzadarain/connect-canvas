import React from 'react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <div className="my-8">
      <div className="bg-code border border-code-border rounded-t-lg px-4 py-2">
        <span className="text-sm font-mono text-code-foreground">
          {language}
        </span>
      </div>
      <pre className="bg-code border border-code-border border-t-0 rounded-b-lg p-4 overflow-x-auto">
        <code className="text-code-foreground whitespace-pre font-mono">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};