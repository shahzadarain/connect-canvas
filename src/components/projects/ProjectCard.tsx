import { useState } from "react";
import { Project } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full overflow-hidden transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700
        ${isExpanded ? 'fixed inset-4 z-50 overflow-y-auto' : 'hover:shadow-lg'}`}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-primary dark:text-primary-foreground line-clamp-2">
              {project.title}
            </CardTitle>
            {isExpanded && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold">Problem Statement</h3>
                  <p>{project.description}</p>
                  
                  <h3 className="text-lg font-semibold">Solution</h3>
                  <p>Our innovative approach leverages cutting-edge technology to address this challenge...</p>
                  
                  <h3 className="text-lg font-semibold">Impact</h3>
                  <ul>
                    <li>Improved efficiency by 30%</li>
                    <li>Served 10,000+ users</li>
                    <li>Deployed in 5 countries</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-tag text-tag-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setIsExpanded(false)}>
                    Close
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-tag text-tag-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                  {project.tags && project.tags.length > 3 && (
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(true)}
                  className="w-full"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;