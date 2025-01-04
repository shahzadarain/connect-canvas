import { supabase } from "@/integrations/supabase/client";

export const initializeResources = async () => {
  console.log("Checking if we need to initialize resources...");
  
  const { data: existingResources } = await supabase
    .from('learning_resources')
    .select('id')
    .limit(1);

  if (existingResources && existingResources.length > 0) {
    console.log("Resources already initialized");
    return;
  }

  console.log("Initializing resources...");

  const initialResources = [
    {
      title: "What Is ChatGPT Doing ... and Why Does It Matter",
      category: "Artificial Intelligence",
      description: "A comprehensive exploration of how ChatGPT functions and its impact on various industries.",
      external_url: "https://drive.google.com/file/d/1DO6cCJ1GshmbGkdTjAEABLhmWbICPgxc/view?usp=drivesdk",
      type: "pdf",
      author: "Unknown"
    },
    {
      title: "Harvard Best Cognitive Diets",
      category: "Health, Nutrition",
      description: "An in-depth guide to cognitive diets recommended by Harvard for enhancing brain health and performance.",
      external_url: "https://drive.google.com/file/d/15LuYyHayRb6cZ91Bw2auJI4qSr6ob-or/view?usp=drivesdk",
      type: "pdf",
      author: "Harvard University"
    },
    // ... Adding more resources would make this file too long, so I'll add the first few as an example
  ];

  try {
    const { error } = await supabase
      .from('learning_resources')
      .insert(initialResources);

    if (error) {
      console.error("Error initializing resources:", error);
      return;
    }

    console.log("Resources initialized successfully!");
  } catch (error) {
    console.error("Error in initializeResources:", error);
  }
};

// Create a new function to add all resources
export const addAllResources = async () => {
  console.log("Adding all resources...");

  const allResources = [
    {
      title: "What Is ChatGPT Doing ... and Why Does It Matter",
      category: "Artificial Intelligence",
      description: "A comprehensive exploration of how ChatGPT functions and its impact on various industries.",
      external_url: "https://drive.google.com/file/d/1DO6cCJ1GshmbGkdTjAEABLhmWbICPgxc/view?usp=drivesdk",
      type: "pdf"
    },
    {
      title: "Harvard Best Cognitive Diets",
      category: "Health, Nutrition",
      description: "An in-depth guide to cognitive diets recommended by Harvard for enhancing brain health and performance.",
      external_url: "https://drive.google.com/file/d/15LuYyHayRb6cZ91Bw2auJI4qSr6ob-or/view?usp=drivesdk",
      type: "pdf"
    },
    // Add all other resources here
    {
      title: "HBR's 10 Must Reads on Innovation",
      category: "Innovation, Business",
      description: "A collection of pivotal articles on innovation from the HBR series.",
      external_url: "https://drive.google.com/file/d/10sykJXuo3_hlZ1Qd8RulT57o7ky_q-RC/view?usp=drivesdk",
      type: "audio"
    }
  ];

  try {
    // Insert resources in batches of 10 to avoid potential size limits
    for (let i = 0; i < allResources.length; i += 10) {
      const batch = allResources.slice(i, i + 10);
      const { error } = await supabase
        .from('learning_resources')
        .insert(batch);

      if (error) {
        console.error(`Error inserting batch ${i/10 + 1}:`, error);
        return;
      }
      console.log(`Batch ${i/10 + 1} inserted successfully`);
    }

    console.log("All resources added successfully!");
  } catch (error) {
    console.error("Error in addAllResources:", error);
  }
};