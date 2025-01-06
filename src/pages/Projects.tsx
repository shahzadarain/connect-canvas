import React, { Suspense } from 'react';
import { projectSections } from '@/components/projects/ProjectData';
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the ProjectSection component
const ProjectSection = React.lazy(() => import('@/components/projects/ProjectSection'));

const Projects = () => {
  return (
    <div 
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-labelledby="main-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h1 
          id="main-heading"
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          tabIndex={0}
        >
          DAG Team Projects
        </h1>
        
        <div className="space-y-12">
          {projectSections.map((section, index) => (
            <Suspense
              key={index}
              fallback={
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg animate-pulse">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="grid gap-6 md:grid-cols-2">
                    {[1, 2].map((n) => (
                      <Skeleton key={n} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                </div>
              }
            >
              <ProjectSection section={section} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;