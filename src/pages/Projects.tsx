import { Brain, Server, BarChart3, Cog, Shield, Cloud, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  tags: string[];
  expectedImpact: string;
}

interface ProjectSection {
  title: string;
  icon: React.ReactNode;
  projects: Project[];
}

const Projects = () => {
  const sections: ProjectSection[] = [
    {
      title: "AI-Based Projects",
      icon: <Brain className="w-6 h-6" />,
      projects: [
        {
          title: "AI-Powered IVR for Refugee Support",
          description: "AI-based IVR allowing refugees to record queries, which are automatically transcribed, categorized, and routed to relevant units. Accessible via web interface and WhatsApp.",
          tags: ["AI", "Automation", "IVR", "RefugeeSupport"],
          expectedImpact: "Improved processing by 70%, addressed 90% unmet communication needs."
        },
        {
          title: "AI-Driven Resettlement Prioritization",
          description: "Developed AI models integrating socio-economic and vulnerability indicators for resettlement decision-making. Advanced Data Science Application for UNHCR Resettlement Program Optimization: Developed a Gradient Boosting Machine (GBM) model to predict the likelihood of successful resettlement outcomes for refugee cases.",
          tags: ["AI", "MachineLearning", "Resettlement"],
          expectedImpact: "Enhanced decision accuracy and fairness in prioritizing vulnerable cases."
        }
      ]
    },
    {
      title: "Digital Transformation Projects",
      icon: <Server className="w-6 h-6" />,
      projects: [
        {
          title: "UNHCR Jordan Digital Transformation",
          description: "Digitized 15+ manual processes, including refugee support and back-office operations, leveraging automation and cloud tools.",
          tags: ["DigitalTransformation", "Automation", "BackOffice"],
          expectedImpact: "Saved thousands of staff hours, improved service accuracy by 40%."
        },
        {
          title: "Self-Renewal System",
          description: "Introduced kiosks for refugees to update personal data using iris scans, reducing manual interviews.",
          tags: ["Automation", "SelfService", "DigitalIdentity"],
          expectedImpact: "Cut interview times by 50%, enhanced data accuracy."
        },
        {
          title: "AI-Enhanced Appointment System",
          description: "Automated IVR system for refugees to book appointments with real-time confirmation.",
          tags: ["AI", "AppointmentBooking", "Automation"],
          expectedImpact: "Reduced booking time by 50%, decreased center congestion."
        }
      ]
    },
    {
      title: "Data Analysis and Dashboards",
      icon: <BarChart3 className="w-6 h-6" />,
      projects: [
        {
          title: "COVID-19 Vaccine Data Highway",
          description: "Integrated refugee data with government systems to enable vaccine registrations.",
          tags: ["DataIntegration", "HealthTech"],
          expectedImpact: "Enabled 58% of refugees to register for vaccinations."
        },
        {
          title: "Operational Dashboards",
          description: "Developed 50+ dashboards for real-time insights on program metrics and refugee status.",
          tags: ["DataVisualization", "Dashboards", "RealTimeAnalytics"],
          expectedImpact: "Improved decision-making for 700,000+ refugees."
        },
        {
          title: "Big Data Platform",
          description: "Unified multiple data sources for comprehensive analysis and reporting.",
          tags: ["BigData", "DataIntegration", "Analytics"],
          expectedImpact: "Reduced data retrieval time by 50%, improved decision accuracy."
        }
      ]
    },
    {
      title: "Automation Initiatives",
      icon: <Cog className="w-6 h-6" />,
      projects: [
        {
          title: "Digital Petition System",
          description: "AI-driven system for automating refugee feedback processing using OCR and NLP.",
          tags: ["AI", "OCR", "Automation"],
          expectedImpact: "Improved response time by 70%."
        },
        {
          title: "Electricity Subsidy Tool",
          description: "Digitized process for refugees to apply for government utility subsidies.",
          tags: ["Automation", "SubsidyManagement"],
          expectedImpact: "Supported 35,000 refugees, reduced application processing time by 40%."
        },
        {
          title: "Departure and Overtime Tracking Apps",
          description: "Automated workflows for staff clearance and overtime approval.",
          tags: ["Automation", "HRTools"],
          expectedImpact: "Streamlined approval processes, saving staff hours."
        }
      ]
    },
    {
      title: "Cybersecurity Efforts",
      icon: <Shield className="w-6 h-6" />,
      projects: [
        {
          title: "Penetration Testing and Security Audits",
          description: "Led cybersecurity initiatives, ensuring secure certifications for critical applications.",
          tags: ["Cybersecurity", "RiskManagement"],
          expectedImpact: "Reduced data breach risks by 20%."
        },
        {
          title: "Data Protection Policies",
          description: "Developed encryption and anonymization protocols for secure refugee data management.",
          tags: ["DataProtection", "Cybersecurity", "Compliance"],
          expectedImpact: "Reduced fraud risks and improved compliance."
        }
      ]
    },
    {
      title: "Cloud Integration Projects",
      icon: <Cloud className="w-6 h-6" />,
      projects: [
        {
          title: "Azure Cloud Migration",
          description: "Migrated operational systems to Azure for scalability and resilience.",
          tags: ["CloudIntegration", "Azure", "Scalability"],
          expectedImpact: "Improved disaster recovery and operational continuity."
        },
        {
          title: "Hakeem Data Highway Integration",
          description: "Enabled real-time health record validation through API integration with national health systems.",
          tags: ["DataIntegration", "HealthTech", "CloudAPI"],
          expectedImpact: "Streamlined refugee health services with government platforms."
        }
      ]
    },
    {
      title: "Capacity Building and Collaboration",
      icon: <Users className="w-6 h-6" />,
      projects: [
        {
          title: "Building Refugee Capacity with Tech Giants",
          description: "Partnered with Microsoft to provide IT and data training for refugees, promoting entrepreneurship.",
          tags: ["CapacityBuilding", "TechCollaboration", "Entrepreneurship"],
          expectedImpact: "Improved employability and self-reliance among refugees."
        },
        {
          title: "Training on Advanced Analytics",
          description: "Conducted 200+ staff training sessions on data analysis, cloud tools, and cybersecurity.",
          tags: ["CapacityBuilding", "Training", "DataAnalytics"],
          expectedImpact: "Reduced manual processes by 40%, enhanced team efficiency."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          DAG Team Projects
        </h1>
        
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                {section.icon}
                <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {section.projects.map((project, projectIndex) => (
                  <Card key={projectIndex} className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;