import { ProjectSectionType } from './types';

export const projectSections: ProjectSectionType[] = [
  {
    title: "AI-Based Projects",
    icon: "brain",
    category: "ai",
    display_order: 1,
    id: 1,
    created_at: null,
    updated_at: null,
    projects: [
      {
        title: "AI-Powered IVR for Refugee Support",
        description: "AI-based IVR allowing refugees to record queries, which are automatically transcribed, categorized, and routed to relevant units. Accessible via web interface and WhatsApp.",
        tags: ["AI", "Automation", "IVR", "RefugeeSupport"]
      },
      {
        title: "AI-Driven Resettlement Prioritization",
        description: "Developed AI models integrating socio-economic and vulnerability indicators for resettlement decision-making. Advanced Data Science Application for UNHCR Resettlement Program Optimization: Developed a Gradient Boosting Machine (GBM) model to predict the likelihood of successful resettlement outcomes for refugee cases.",
        tags: ["AI", "MachineLearning", "Resettlement"]
      }
    ]
  },
  {
    title: "Digital Transformation Projects",
    icon: "server",
    category: "digital",
    display_order: 2,
    id: 2,
    created_at: null,
    updated_at: null,
    projects: [
      {
        title: "UNHCR Jordan Digital Transformation",
        description: "Digitized 15+ manual processes, including refugee support and back-office operations, leveraging automation and cloud tools.",
        tags: ["DigitalTransformation", "Automation", "BackOffice"]
      },
      {
        title: "Self-Renewal System",
        description: "Introduced kiosks for refugees to update personal data using iris scans, reducing manual interviews.",
        tags: ["Automation", "SelfService", "DigitalIdentity"]
      }
    ]
  },
  {
    title: "Data Analysis and Dashboards",
    icon: "bar-chart-3",
    category: "data",
    display_order: 3,
    id: 3,
    created_at: null,
    updated_at: null,
    projects: [
      {
        title: "COVID-19 Vaccine Data Highway",
        description: "Integrated refugee data with government systems to enable vaccine registrations.",
        tags: ["DataIntegration", "HealthTech"]
      },
      {
        title: "Operational Dashboards",
        description: "Developed 50+ dashboards for real-time insights on program metrics and refugee status.",
        tags: ["DataVisualization", "Dashboards", "RealTimeAnalytics"]
      }
    ]
  },
  {
    title: "Automation Initiatives",
    icon: "cog",
    category: "automation",
    display_order: 4,
    id: 4,
    created_at: null,
    updated_at: null,
    projects: [
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
    title: "Cybersecurity Efforts",
    icon: "shield",
    category: "security",
    display_order: 5,
    id: 5,
    created_at: null,
    updated_at: null,
    projects: [
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
    title: "Cloud Integration Projects",
    icon: "cloud",
    category: "cloud",
    display_order: 6,
    id: 6,
    created_at: null,
    updated_at: null,
    projects: [
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
    title: "Capacity Building and Collaboration",
    icon: "users",
    category: "capacity",
    display_order: 7,
    id: 7,
    created_at: null,
    updated_at: null,
    projects: [
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