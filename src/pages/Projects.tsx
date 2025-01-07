import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectSectionType } from "@/components/projects/types";
import ProjectSection from "@/components/projects/ProjectSection";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
      <div className="space-y-16">
        {sections?.map((section) => (
          <div key={section.id}>
            <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
            <ProjectSection category={section.category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;