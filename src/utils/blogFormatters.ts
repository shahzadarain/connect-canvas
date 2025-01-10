import DOMPurify from 'dompurify';

export const formatLinks = (content: string): string => {
  // Keep existing link formatting logic
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return content.replace(linkRegex, '<a href="$2" class="text-blue-500 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">$1</a>');
};

export const formatInlineText = (content: string): string => {
  // Process bold text
  let formattedContent = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Process italic text
  formattedContent = formattedContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Process inline code
  formattedContent = formattedContent.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>');
  
  // Allow HTML tags to be rendered
  return DOMPurify.sanitize(formattedContent, {
    ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'style'],
    ADD_ATTR: ['class', 'style']
  });
};
