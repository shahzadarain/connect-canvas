import { format } from 'date-fns';

export const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM dd, yyyy');
};

export * from './blog/types';
export * from './blog/dbOperations';
export { initialBlogPosts } from './blog/initialPosts';