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
        tags: ["AI", "Automation", "IVR", "RefugeeSupport"],
        impact: "Improved processing by 70%, addressed 90% unmet communication needs"
      },
      {
        title: "AI-Driven Resettlement Prioritization",
        description: "Developed AI models integrating socio-economic and vulnerability indicators for resettlement decision-making. Advanced Data Science Application for UNHCR Resettlement Program Optimization.",
        tags: ["AI", "MachineLearning", "Resettlement"],
        impact: "Enhanced decision accuracy and fairness in prioritizing vulnerable cases"
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
        tags: ["DigitalTransformation", "Automation", "BackOffice"],
        impact: "Saved thousands of staff hours, improved service accuracy by 40%"
      },
      {
        title: "Self-Renewal System",
        description: "Introduced kiosks for refugees to update personal data using iris scans, reducing manual interviews.",
        tags: ["Automation", "SelfService", "DigitalIdentity"],
        impact: "Cut interview times by 50%, enhanced data accuracy"
      },
      {
        title: "AI-Enhanced Appointment System",
        description: "Automated IVR system for refugees to book appointments with real-time confirmation.",
        tags: ["AI", "AppointmentBooking", "Automation"],
        impact: "Reduced booking time by 50%, decreased center congestion"
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
        tags: ["DataIntegration", "HealthTech"],
        impact: "Enabled 58% of refugees to register for vaccinations"
      },
      {
        title: "Operational Dashboards",
        description: "Developed 50+ dashboards for real-time insights on program metrics and refugee status.",
        tags: ["DataVisualization", "Dashboards", "RealTimeAnalytics"],
        impact: "Improved decision-making for 700,000+ refugees"
      },
      {
        title: "Big Data Platform",
        description: "Unified multiple data sources for comprehensive analysis and reporting.",
        tags: ["BigData", "DataIntegration", "Analytics"],
        impact: "Reduced data retrieval time by 50%, improved decision accuracy"
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
        tags: ["AI", "OCR", "Automation"],
        impact: "Improved response time by 70%"
      },
      {
        title: "Electricity Subsidy Tool",
        description: "Digitized process for refugees to apply for government utility subsidies.",
        tags: ["Automation", "SubsidyManagement"],
        impact: "Supported 35,000 refugees, reduced application processing time by 40%"
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
        tags: ["Cybersecurity", "RiskManagement"],
        impact: "Reduced data breach risks by 20%"
      },
      {
        title: "Data Protection Policies",
        description: "Developed encryption and anonymization protocols for secure refugee data management.",
        tags: ["DataProtection", "Cybersecurity", "Compliance"],
        impact: "Reduced fraud risks and improved compliance"
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
        tags: ["CloudIntegration", "Azure", "Scalability"],
        impact: "Improved disaster recovery and operational continuity"
      },
      {
        title: "Hakeem Data Highway Integration",
        description: "Enabled real-time health record validation through API integration with national health systems.",
        tags: ["DataIntegration", "HealthTech", "CloudAPI"],
        impact: "Streamlined refugee health services with government platforms"
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
        tags: ["CapacityBuilding", "TechCollaboration", "Entrepreneurship"],
        impact: "Improved employability and self-reliance among refugees"
      },
      {
        title: "Training on Advanced Analytics",
        description: "Conducted 200+ staff training sessions on data analysis, cloud tools, and cybersecurity.",
        tags: ["CapacityBuilding", "Training", "DataAnalytics"],
        impact: "Reduced manual processes by 40%, enhanced team efficiency"
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
                    <p className="text-sm font-medium text-accent">
                      Impact: {item.impact}
                    </p>
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