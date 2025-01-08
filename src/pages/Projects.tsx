import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectSectionType } from "@/components/projects/types";
import ProjectSection from "@/components/projects/ProjectSection";
import { Skeleton } from "@/components/ui/skeleton";
import IconComponent from "@/components/projects/IconComponent";

const Projects = () => {
  const { data: sections, isLoading, error } = useQuery({
    queryKey: ["project-sections"],
    queryFn: async () => {
      console.log("Fetching project sections");
      const { data, error } = await supabase
        .from("project_sections")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      console.log("Fetched project sections:", data);
      return data as ProjectSectionType[];
    },
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  });

  if (error) {
    console.error("Error fetching project sections:", error);
    return <div>Error loading projects</div>;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[400px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Our Projects
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          Explore our innovative projects across different domains, from AI and digital transformation to cybersecurity and cloud integration.
        </p>
        <div className="space-y-24">
          {sections?.map((section) => (
            <div 
              key={section.id} 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                  <IconComponent name={section.icon} className="w-8 h-8 text-primary dark:text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-primary dark:text-primary-foreground">
                  {section.title}
                </h2>
              </div>
              <ProjectSection category={section.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;