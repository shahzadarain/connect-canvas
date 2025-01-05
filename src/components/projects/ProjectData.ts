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
    icon: Server,
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
    icon: BarChart3,
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
    icon: Cog,
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
    icon: Shield,
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
    icon: Cloud,
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
    icon: Users,
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
