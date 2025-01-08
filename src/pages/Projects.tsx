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
    gcTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 2, // 2 minutes
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
      <div className="space-y-16">
        {sections?.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <IconComponent name={section.icon} className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            </div>
            <ProjectSection category={section.category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;