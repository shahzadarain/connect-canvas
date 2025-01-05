import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from 'lucide-react';
import { ProjectType } from './types';

interface ProjectSectionProps {
  title: string;
  icon: React.ReactNode;
  projects: ProjectType[];
}

const ProjectSection = ({ title, icon, projects }: ProjectSectionProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6" role="heading" aria-level={2}>
        {icon}
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, projectIndex) => (
          <Card 
            key={projectIndex} 
            className="p-6 hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary"
            tabIndex={0}
            role="article"
            aria-labelledby={`project-title-${projectIndex}`}
          >
            <h3 
              id={`project-title-${projectIndex}`}
              className="text-xl font-semibold mb-3 text-foreground"
            >
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project tags">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="focus:ring-2 focus:ring-primary"
                  role="listitem"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <strong className="text-primary">Expected Impact:</strong>
              <p className="text-muted-foreground">{project.expectedImpact}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;