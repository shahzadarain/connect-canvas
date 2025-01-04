import { supabase } from "@/integrations/supabase/client";

export const initializeResources = async () => {
  console.log('Initializing resources...');
  try {
    const { data: existingResources, error: fetchError } = await supabase
      .from('learning_resources')
      .select('title, category, description, external_url, type');

    if (fetchError) {
      console.error('Error fetching resources:', fetchError);
      throw fetchError;
    }

    if (!existingResources || existingResources.length === 0) {
      console.log('No existing resources found, proceeding with initialization');
      return;
    }

    console.log('Resources already exist, skipping initialization');
  } catch (error) {
    console.error('Error initializing resources:', error);
    throw error;
  }
};

export const addAllResources = async () => {
  console.log('Adding all resources...');
  try {
    const { data: existingResources, error: fetchError } = await supabase
      .from('learning_resources')
      .select('title, category, description, external_url, type, author');

    if (fetchError) {
      console.error('Error fetching resources:', fetchError);
      throw fetchError;
    }

    if (existingResources && existingResources.length > 0) {
      console.log('Resources already exist, skipping addition');
      return;
    }

    const initialResources = [
      {
        title: "Introduction to AI Ethics",
        category: "AI Ethics",
        description: "A comprehensive guide to ethical considerations in AI development",
        external_url: "https://example.com/ai-ethics",
        type: "article",
        author: "Dr. Ethics Expert"
      },
      {
        title: "Machine Learning Basics",
        category: "Machine Learning",
        description: "Fundamental concepts of machine learning explained",
        external_url: "https://example.com/ml-basics",
        type: "course",
        author: "Prof. ML Teacher"
      },
      {
        title: "Humanitarian AI Applications",
        category: "Humanitarian Tech",
        description: "Case studies of AI applications in humanitarian work",
        external_url: "https://example.com/humanitarian-ai",
        type: "pdf",
        author: "Aid Tech Institute"
      }
    ];

    const { error: insertError } = await supabase
      .from('learning_resources')
      .insert(initialResources);

    if (insertError) {
      console.error('Error inserting resources:', insertError);
      throw insertError;
    }

    console.log('Resources initialization complete');
  } catch (error) {
    console.error('Error adding all resources:', error);
    throw error;
  }
};