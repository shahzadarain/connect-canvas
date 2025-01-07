import React from 'react';
import { ProjectSectionType } from './types';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectSectionProps {
  section: ProjectSectionType;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ section }) => {
  const Icon = section.icon;
  
  // Query for individual section data with optimistic updates
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', section.title],
    queryFn: async () => {
      console.log(`Fetching projects for section: ${section.title}`);
      return section.projects;
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache persists for 30 minutes
    suspense: true,
  });
  
  return (
    <motion.div 
      className="mb-12"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-labelledby={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg"
          role="presentation"
        >
          <Icon className="w-6 h-6 text-blue-500 dark:text-blue-300" aria-hidden="true" />
        </div>
        <h2 
          id={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-2xl font-bold"
        >
          {section.title}
        </h2>
      </div>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label={`${section.title} projects`}
      >
        {isLoading ? (
          Array(3).fill(null).map((_, index) => (
            <Card key={index} className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <div className="flex flex-wrap gap-2">
                {Array(3).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
            </Card>
          ))
        ) : (
          projects?.map((project, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-shadow focus-visible:ring-2 focus-visible:ring-primary"
              tabIndex={0}
              role="article"
              aria-labelledby={`project-${index}-title`}
            >
              <h3 
                id={`project-${index}-title`}
                className="text-xl font-semibold mb-3"
              >
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div>
                <strong 
                  className="text-sm text-gray-700 dark:text-gray-200"
                  id={`tags-${index}-label`}
                >
                  Tags:
                </strong>
                <div 
                  className="flex flex-wrap gap-2 mt-1"
                  role="list"
                  aria-labelledby={`tags-${index}-label`}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded-full"
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ProjectSection;