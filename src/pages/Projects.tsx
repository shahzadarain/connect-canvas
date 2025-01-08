import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectSectionType } from "@/components/projects/types";
import ProjectSection from "@/components/projects/ProjectSection";
import { Skeleton } from "@/components/ui/skeleton";
import IconComponent from "@/components/projects/IconComponent";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const techTags = ["#AI", "#MachineLearning", "#Automation", "#DataScience"];
  const domainTags = ["#SocialImpact", "#Healthcare", "#Education"];
  const regionTags = ["#Global", "#Africa", "#Asia", "#Europe"];

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (error) {
    console.error("Error fetching project sections:", error);
    return <div>Error loading projects</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            DAG Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Innovative Solutions Leveraging AI, Machine Learning, and Automation for Global Impact
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {techTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedTags.includes(tag)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {domainTags.concat(regionTags).map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedTags.includes(tag)
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Sections */}
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-24"
          >
            {sections?.map((section) => (
              <div 
                key={section.id} 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                    <IconComponent 
                      name={section.icon} 
                      className="w-8 h-8 text-primary dark:text-primary-foreground" 
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-primary dark:text-primary-foreground">
                    {section.title}
                  </h2>
                </div>
                <ProjectSection 
                  category={section.category} 
                  searchQuery={searchQuery}
                  selectedTags={selectedTags}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;