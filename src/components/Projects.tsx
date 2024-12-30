import React from 'react';
import { Code2, Database, Shield, Rocket, Brain, Cloud, FileText } from 'lucide-react';

const projects = [
  {
    category: "AI",
    icon: Brain,
    items: [
      {
        title: "AI-Powered Refugee Registration",
        description: "Implemented machine learning for automated document processing.",
        impact: "50% reduction in processing time"
      }
    ]
  },
  {
    category: "Data",
    icon: Database,
    items: [
      {
        title: "Humanitarian Data Platform",
        description: "Built scalable data infrastructure for aid distribution.",
        impact: "Serving 1M+ beneficiaries"
      }
    ]
  },
  {
    category: "Cyber Security",
    icon: Shield,
    items: [
      {
        title: "Security Framework Implementation",
        description: "Developed comprehensive security protocols for NGOs.",
        impact: "Zero breaches since deployment"
      }
    ]
  },
  {
    category: "Digital Transformation",
    icon: Rocket,
    items: [
      {
        title: "NGO Digital Modernization",
        description: "Led digital transformation for international organization.",
        impact: "90% process automation"
      }
    ]
  }
];

const Projects = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((category) => (
            <div key={category.category} className="group">
              <div className="bg-card backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.title}>
                      <h4 className="font-medium text-primary mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <p className="text-sm font-medium text-accent">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;