import React from 'react';
import { 
  Brain, Database, Shield, Rocket, Cloud, Users, 
  Bot, FileText, Lock, Server, BookOpen, Zap 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const projectCategories = [
  {
    category: "AI-Based Projects",
    icon: Brain,
    items: [
      {
        title: "AI-Powered IVR for Refugee Support",
        description: "AI-based IVR allowing refugees to record queries, which are automatically transcribed, categorized, and routed to relevant units. Accessible via web interface and WhatsApp.",
        tags: ["AI", "Automation", "IVR", "RefugeeSupport"]
      },
      {
        title: "AI-Driven Resettlement Prioritization",
        description: "Developed AI models integrating socio-economic and vulnerability indicators for resettlement decision-making. Advanced Data Science Application for UNHCR Resettlement Program Optimization.",
        tags: ["AI", "MachineLearning", "Resettlement"]
      }
    ]
  },
  {
    category: "Digital Transformation",
    icon: Rocket,
    items: [
      {
        title: "UNHCR Jordan Digital Transformation",
        description: "Digitized 15+ manual processes, including refugee support and back-office operations, leveraging automation and cloud tools.",
        tags: ["DigitalTransformation", "Automation", "BackOffice"]
      },
      {
        title: "Self-Renewal System",
        description: "Introduced kiosks for refugees to update personal data using iris scans, reducing manual interviews.",
        tags: ["Automation", "SelfService", "DigitalIdentity"]
      },
      {
        title: "AI-Enhanced Appointment System",
        description: "Automated IVR system for refugees to book appointments with real-time confirmation.",
        tags: ["AI", "AppointmentBooking", "Automation"]
      }
    ]
  },
  {
    category: "Data Analysis & Dashboards",
    icon: Database,
    items: [
      {
        title: "COVID-19 Vaccine Data Highway",
        description: "Integrated refugee data with government systems to enable vaccine registrations.",
        tags: ["DataIntegration", "HealthTech"]
      },
      {
        title: "Operational Dashboards",
        description: "Developed 50+ dashboards for real-time insights on program metrics and refugee status.",
        tags: ["DataVisualization", "Dashboards", "RealTimeAnalytics"]
      },
      {
        title: "Big Data Platform",
        description: "Unified multiple data sources for comprehensive analysis and reporting.",
        tags: ["BigData", "DataIntegration", "Analytics"]
      }
    ]
  },
  {
    category: "Automation Initiatives",
    icon: Bot,
    items: [
      {
        title: "Digital Petition System",
        description: "AI-driven system for automating refugee feedback processing using OCR and NLP.",
        tags: ["AI", "OCR", "Automation"]
      },
      {
        title: "Electricity Subsidy Tool",
        description: "Digitized process for refugees to apply for government utility subsidies.",
        tags: ["Automation", "SubsidyManagement"]
      }
    ]
  },
  {
    category: "Cybersecurity",
    icon: Shield,
    items: [
      {
        title: "Penetration Testing and Security Audits",
        description: "Led cybersecurity initiatives, ensuring secure certifications for critical applications.",
        tags: ["Cybersecurity", "RiskManagement"]
      },
      {
        title: "Data Protection Policies",
        description: "Developed encryption and anonymization protocols for secure refugee data management.",
        tags: ["DataProtection", "Cybersecurity", "Compliance"]
      }
    ]
  },
  {
    category: "Cloud Integration",
    icon: Cloud,
    items: [
      {
        title: "Azure Cloud Migration",
        description: "Migrated operational systems to Azure for scalability and resilience.",
        tags: ["CloudIntegration", "Azure", "Scalability"]
      },
      {
        title: "Hakeem Data Highway Integration",
        description: "Enabled real-time health record validation through API integration with national health systems.",
        tags: ["DataIntegration", "HealthTech", "CloudAPI"]
      }
    ]
  },
  {
    category: "Capacity Building",
    icon: Users,
    items: [
      {
        title: "Building Refugee Capacity with Tech Giants",
        description: "Partnered with Microsoft to provide IT and data training for refugees, promoting entrepreneurship.",
        tags: ["CapacityBuilding", "TechCollaboration", "Entrepreneurship"]
      },
      {
        title: "Training on Advanced Analytics",
        description: "Conducted 200+ staff training sessions on data analysis, cloud tools, and cybersecurity.",
        tags: ["CapacityBuilding", "Training", "DataAnalytics"]
      }
    ]
  }
];

const Projects = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          DAG Team Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectCategories.map((category) => (
            <Card key={category.category} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">
                    {category.category}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.title} className="space-y-3">
                    <h4 className="text-lg font-medium text-primary">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;