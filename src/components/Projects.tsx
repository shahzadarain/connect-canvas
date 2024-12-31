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

const getTagColor = (tag: string) => {
  // Create a consistent color mapping based on the first character of the tag
  const colors = {
    'A': 'bg-[#8B5CF6] hover:bg-[#7C3AED]', // Vivid Purple
    'B': 'bg-[#D946EF] hover:bg-[#C026D3]', // Magenta Pink
    'C': 'bg-[#F97316] hover:bg-[#EA580C]', // Bright Orange
    'D': 'bg-[#0EA5E9] hover:bg-[#0284C7]', // Ocean Blue
    'R': 'bg-[#EC4899] hover:bg-[#DB2777]', // Pink
    'T': 'bg-[#14B8A6] hover:bg-[#0D9488]', // Teal
    'H': 'bg-[#6366F1] hover:bg-[#4F46E5]', // Indigo
    'S': 'bg-[#EAB308] hover:bg-[#CA8A04]', // Yellow
    'O': 'bg-[#22C55E] hover:bg-[#16A34A]', // Green
    'M': 'bg-[#F43F5E] hover:bg-[#E11D48]', // Red
  };
  
  const firstChar = tag.charAt(0).toUpperCase();
  return colors[firstChar] || 'bg-[#6366F1] hover:bg-[#4F46E5]'; // Default to indigo if no match
};

const Projects = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16 tracking-tight">
          DAG Team Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projectCategories.map((category) => (
            <Card 
              key={category.category} 
              className="group hover:shadow-xl transition-all duration-300 border border-primary/10 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary tracking-tight">
                    {category.category}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {category.items.map((item) => (
                  <div 
                    key={item.title} 
                    className="space-y-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                  >
                    <h4 className="text-xl font-medium text-primary tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white transition-colors duration-300 ${getTagColor(tag)}`}
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
