import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { projectSections } from '@/components/projects/ProjectData';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load the ProjectSection component
const ProjectSection = React.lazy(() => import('@/components/projects/ProjectSection'));

const Projects = () => {
  // Implement query for project sections with caching and prefetching
  const { data: sections, isLoading, error } = useQuery({
    queryKey: ['projectSections'],
    queryFn: async () => {
      console.log('Fetching project sections...');
      return projectSections;
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache persists for 30 minutes
  });

  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "DAG Team Projects",
    "description": "Explore our diverse portfolio of projects including AI solutions, digital transformation initiatives, and humanitarian technology innovations.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": sections?.map((section, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": section.title,
        "description": `Collection of ${section.title.toLowerCase()} projects`
      })) || []
    }
  };

  if (error) {
    console.error('Error loading project sections:', error);
    return <ErrorBoundary>{error.toString()}</ErrorBoundary>;
  }

  return (
    <ErrorBoundary>
      <Helmet>
        <title>DAG Team Projects | Innovative Solutions Portfolio</title>
        <meta 
          name="description" 
          content="Explore our portfolio of innovative projects spanning AI, digital transformation, and humanitarian technology solutions." 
        />
        <meta 
          name="keywords" 
          content="AI projects, digital transformation, humanitarian technology, innovation, portfolio" 
        />
        
        {/* OpenGraph tags */}
        <meta property="og:title" content="DAG Team Projects | Innovative Solutions Portfolio" />
        <meta 
          property="og:description" 
          content="Explore our portfolio of innovative projects spanning AI, digital transformation, and humanitarian technology solutions." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DAG Team Projects | Innovative Solutions Portfolio" />
        <meta 
          name="twitter:description" 
          content="Explore our portfolio of innovative projects spanning AI, digital transformation, and humanitarian technology solutions." 
        />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
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
          
          <div 
            className="space-y-12"
            role="list"
            aria-label="Project sections"
          >
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="animate-pulse">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-64 rounded-lg" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              sections?.map((section, index) => (
                <Suspense
                  key={index}
                  fallback={
                    <div 
                      className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg animate-pulse"
                      role="alert"
                      aria-label="Loading project section"
                    >
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
              ))
            )}
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default Projects;