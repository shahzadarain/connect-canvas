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
      title: "HBR's 10 Must Reads on Innovation",
      author: "Harvard Business Review",
      type: "audio",
      external_url: "https://drive.google.com/file/d/10sykJXuo3_hlZ1Qd8RulT57o7ky_q-RC/view?usp=drivesdk",
      category: "Business"
    },
    {
      title: "Humor, Seriously",
      author: "Jennifer Aaker & Naomi Bagdonas",
      type: "external_link",
      external_url: "https://www.humorseriously.com/",
      category: "Personal Development"
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      type: "external_link",
      external_url: "https://dataintensive.net/",
      category: "Technology"
    },
    {
      title: "The Innovator's Dilemma",
      author: "Clayton M. Christensen",
      type: "external_link",
      external_url: "https://www.amazon.com/Innovators-Dilemma-Technologies-Management-Innovation/dp/1633691780",
      category: "Business"
    }
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