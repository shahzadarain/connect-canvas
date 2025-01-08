import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "./types";
import ProjectCard from "./ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectSectionProps {
  category: string;
  searchQuery: string;
  selectedTags: string[];
}

const ProjectSection = ({ category, searchQuery, selectedTags }: ProjectSectionProps) => {
  console.log("Rendering ProjectSection for category:", category);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects", category],
    queryFn: async () => {
      console.log("Fetching projects for category:", category);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("category", category);

      if (error) throw error;
      console.log("Fetched projects:", data);
      return data as Project[];
    },
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  });

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => project.tags?.includes(tag.replace('#', '')));

    return matchesSearch && matchesTags;
  });

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>Error loading projects</div>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[300px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectSection;