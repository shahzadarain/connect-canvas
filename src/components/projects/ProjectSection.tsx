import React from 'react';
import { ProjectSectionType } from './types';
import { Card } from "@/components/ui/card";

interface ProjectSectionProps {
  section: ProjectSectionType;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ section }) => {
  const Icon = section.icon;
  
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold">{section.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.projects.map((project, index) => (
          <Card 
            key={index}
            className="p-6 hover:shadow-lg transition-shadow"
            tabIndex={0}
            role="article"
          >
            <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="space-y-3">
              <div>
                <strong className="text-sm text-gray-700">Expected Impact:</strong>
                <p className="text-sm text-gray-600">{project.expectedImpact}</p>
              </div>
              <div>
                <strong className="text-sm text-gray-700">Tags:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;