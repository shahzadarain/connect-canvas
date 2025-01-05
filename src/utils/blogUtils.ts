import { format } from 'date-fns';

export const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM dd, yyyy');
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const generateTableOfContents = (content: string) => {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ id, text, level });
    }
  });

  return headings;
};

export * from './blog/types';
export * from './blog/dbOperations';
export { initialBlogPosts } from './blog/initialPosts';