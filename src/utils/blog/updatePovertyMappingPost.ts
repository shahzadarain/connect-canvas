
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const updatePovertyMappingPost = async () => {
  try {
    // Find the existing blog post by title
    const { data: existingPost, error: findError } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('title', '%Poverty Mapping: Technical Deep-Dive%')
      .single();

    if (findError) {
      console.error('Error finding poverty mapping post:', findError);
      throw findError;
    }

    if (!existingPost) {
      console.error('Poverty mapping blog post not found');
      throw new Error('Blog post not found');
    }

    // Updated SEO metadata, tags, and keywords
    const tags = [
      'Poverty Mapping', 
      'Geospatial Analysis', 
      'Humanitarian Tech', 
      'SDG Monitoring', 
      'Data Science', 
      'Remote Sensing', 
      'Sustainable Development',
      'Development Economics',
      'World Bank',
      'UN Development'
    ];

    const metaKeywords = [
      'poverty mapping techniques',
      'geospatial poverty analysis',
      'humanitarian data science',
      'poverty measurement methodologies',
      'small area estimation',
      'SDG poverty tracking',
      'high-resolution poverty maps',
      'satellite imagery poverty detection',
      'machine learning for poverty prediction',
      'development economics geospatial tools',
      'remote sensing for poverty assessment',
      'multidimensional poverty mapping',
      'vulnerability assessment frameworks'
    ];

    const metaDescription = 
      'A technical deep-dive into poverty mapping methodologies, including geospatial analysis, satellite imagery, machine learning, and remote sensing techniques for effective poverty assessment and SDG monitoring in developing regions.';

    // Update the blog post with enhanced SEO data
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        tags: tags,
        meta_keywords: metaKeywords,
        meta_description: metaDescription,
        status: 'published' // Ensure it's published
      })
      .eq('id', existingPost.id);

    if (updateError) {
      console.error('Error updating poverty mapping post:', updateError);
      throw updateError;
    }

    return { success: true, message: 'Poverty mapping blog post updated successfully' };
  } catch (error) {
    console.error('Error in updatePovertyMappingPost:', error);
    throw error;
  }
};
