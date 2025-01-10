import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy code:', err);
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900">
        <span className="text-sm text-zinc-400">
          {language || 'code'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 text-zinc-400 hover:text-white"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-zinc-100">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};