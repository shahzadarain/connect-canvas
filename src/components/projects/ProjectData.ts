import { Brain, Server, BarChart3, Cog, Shield, Cloud, Users } from "lucide-react";
import { ProjectSectionType } from './types';

export const projectSections: ProjectSectionType[] = [
  {
    title: "AI-Based Projects",
    icon: Brain,
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
    icon: Server,
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
      },
      {
        title: "AI-Enhanced Appointment System",
        description: "Automated IVR system for refugees to book appointments with real-time confirmation.",
        tags: ["AI", "AppointmentBooking", "Automation"]
      }
    ]
  },
  {
    title: "Data Analysis and Dashboards",
    icon: BarChart3,
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
      },
      {
        title: "Big Data Platform",
        description: "Unified multiple data sources for comprehensive analysis and reporting.",
        tags: ["BigData", "DataIntegration", "Analytics"]
      }
    ]
  },
  {
    title: "Automation Initiatives",
    icon: Cog,
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
      },
      {
        title: "Departure and Overtime Tracking Apps",
        description: "Automated workflows for staff clearance and overtime approval.",
        tags: ["Automation", "HRTools"]
      }
    ]
  },
  {
    title: "Cybersecurity Efforts",
    icon: Shield,
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
    icon: Cloud,
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
    icon: Users,
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