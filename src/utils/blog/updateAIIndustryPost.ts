
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const updateAIIndustryPost = async () => {
  try {
    // Find the existing blog post by title
    const { data: existingPost, error: findError } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('title', '%Artificial Intelligence\'s Transformative Impact%')
      .single();

    if (findError) {
      console.error('Error finding AI Industry post:', findError);
      throw findError;
    }

    if (!existingPost) {
      console.error('AI Industry blog post not found');
      throw new Error('Blog post not found');
    }

    // Clean up the content
    let updatedContent = existingPost.content;
    
    // Remove reference links like [1], [2], etc.
    updatedContent = updatedContent.replace(/\[\d+\]/g, '');
    
    // Remove any "References" section at the end if it exists
    updatedContent = updatedContent.replace(/## References[\s\S]*$/, '');
    
    // Remove URLs in parentheses
    updatedContent = updatedContent.replace(/\(https?:\/\/[^\s\)]+\)/g, '');
    
    // Remove standalone URLs
    updatedContent = updatedContent.replace(/https?:\/\/[^\s]+/g, '');
    
    // Add spacing between paragraphs for better readability
    updatedContent = updatedContent.replace(/\n\n/g, '\n\n\n');

    // Updated SEO metadata and tags
    const tags = [
      'Artificial Intelligence', 
      'Industry 4.0', 
      'Economic Impact', 
      'Digital Transformation', 
      'Business Intelligence', 
      'Machine Learning', 
      'Automation',
      'Innovation',
      'Economic Growth',
      'Future of Work'
    ];

    // Update the blog post with enhanced content and SEO data
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        content: updatedContent,
        tags: tags,
        status: 'published', // Ensure it's published
        featured_image: '/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpeg' // Add a default featured image
      })
      .eq('id', existingPost.id);

    if (updateError) {
      console.error('Error updating AI Industry post:', updateError);
      throw updateError;
    }

    return { success: true, message: 'AI Industry blog post updated successfully' };
  } catch (error) {
    console.error('Error in updateAIIndustryPost:', error);
    throw error;
  }
};
