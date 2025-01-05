import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI for Humanitarian Aid',
      description: 'Leveraging artificial intelligence to enhance humanitarian aid delivery and impact assessment.',
      link: '/ai-humanitarian',
      tags: ['AI', 'Humanitarian', 'Innovation']
    },
    {
      title: 'Digital Transformation',
      description: 'Leading digital transformation initiatives for organizations to improve efficiency and effectiveness.',
      link: '/ai-tools',
      tags: ['Digital', 'Technology', 'Transformation']
    },
    {
      title: 'Data Analytics',
      description: 'Implementing advanced analytics solutions to drive data-informed decision making.',
      link: '/ai-news',
      tags: ['Analytics', 'Data', 'Intelligence']
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={project.link}>
                <Button variant="outline" className="w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;