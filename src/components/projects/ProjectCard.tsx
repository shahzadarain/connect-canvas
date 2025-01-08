import { Project } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-primary dark:text-primary-foreground line-clamp-2">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 transition-colors"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;