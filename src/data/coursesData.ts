export interface Course {
  title: string;
  platform: string;
  instructor?: string;
  completed: string;
  description?: string;
  featured?: boolean;
}

export const courses: { category: string; items: Course[] }[] = [
  {
    category: "AI & Machine Learning",
    items: [
      {
        title: "IBM Generative AI Engineering Professional Certificate",
        platform: "Coursera",
        completed: "May 2024",
        description: "Comprehensive certification in generative AI engineering, including Python for data science and AI development",
        featured: true
      },
      {
        title: "Building a Responsible AI Program",
        platform: "LinkedIn",
        instructor: "Katrina Ingram",
        completed: "Apr 2024",
        description: "Framework for implementing responsible AI within organizations"
      },
      {
        title: "Fine-Tune Your LLMs",
        platform: "LinkedIn",
        instructor: "Kesha Williams",
        completed: "Jul 2024",
        description: "Advanced techniques for fine-tuning large language models"
      },
      {
        title: "RAG and Fine-Tuning Explained",
        platform: "LinkedIn",
        instructor: "Morten Rand-Hendriksen",
        completed: "Jul 2024",
        description: "Deep dive into Retrieval-Augmented Generation and model optimization"
      }
    ]
  },
  {
    category: "Cybersecurity & Privacy",
    items: [
      {
        title: "IBM Generative AI for Cybersecurity",
        platform: "Coursera",
        completed: "October 2024",
        description: "Advanced applications of generative AI in cybersecurity operations",
        featured: true
      },
      {
        title: "CSSLP Certification Series",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Comprehensive secure software lifecycle professional certification preparation"
      },
      {
        title: "Privacy by Design Series",
        platform: "LinkedIn",
        instructor: "Nishant Bhajaria",
        completed: "Dec 2022",
        description: "Implementation of privacy-first approaches in data management"
      },
      {
        title: "GDPR & Privacy Culture",
        platform: "LinkedIn",
        instructor: "Multiple Experts",
        completed: "Dec 2022",
        description: "Comprehensive training in GDPR compliance and privacy culture development"
      }
    ]
  },
  {
    category: "Data Analytics & Visualization",
    items: [
      {
        title: "Google Data Analytics Professional Certificate",
        platform: "Coursera",
        completed: "July 2023",
        description: "Comprehensive data analytics certification from Google",
        featured: true
      },
      {
        title: "Power BI Mastery Series",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Various",
        description: "Advanced Power BI skills for data visualization and analysis"
      },
      {
        title: "Statistics Foundations Series",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Various",
        description: "Comprehensive statistics training from basics to advanced concepts"
      },
      {
        title: "GIS, Mapping, and Spatial Analysis",
        platform: "Coursera",
        completed: "March 2023",
        description: "Advanced geographical information systems and spatial analysis"
      }
    ]
  },
  {
    category: "Leadership & Strategy",
    items: [
      {
        title: "Strategic Thinking",
        platform: "LinkedIn",
        instructor: "Dorie Clark",
        completed: "Nov 2023",
        description: "Advanced strategic decision-making and leadership",
        featured: true
      },
      {
        title: "Project Management Skills for Leaders",
        platform: "LinkedIn",
        instructor: "Dana Brownlee",
        completed: "Dec 2022",
        description: "Essential project management skills for leadership roles"
      },
      {
        title: "Creating a Culture of Change",
        platform: "LinkedIn",
        instructor: "Jerry Pico",
        completed: "Aug 2020",
        description: "Strategies for fostering organizational transformation"
      },
      {
        title: "Strategic Negotiation",
        platform: "LinkedIn",
        instructor: "Mike Figliuolo",
        completed: "Apr 2020",
        description: "Advanced negotiation techniques for business leaders"
      }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      {
        title: "Azure Administration Series",
        platform: "LinkedIn",
        instructor: "Matt Hester",
        completed: "Feb 2020",
        description: "Comprehensive Azure cloud administration training",
        featured: true
      },
      {
        title: "AWS for Developers",
        platform: "LinkedIn",
        instructor: "Bear Cahill",
        completed: "Feb 2020",
        description: "Development fundamentals for Amazon Web Services"
      },
      {
        title: "Elastic Stack Implementation",
        platform: "LinkedIn",
        instructor: "Emmanuel Henri",
        completed: "Feb 2020",
        description: "ELK Stack deployment and management"
      },
      {
        title: "Cloud Security Concepts",
        platform: "LinkedIn",
        instructor: "David Linthicum",
        completed: "Dec 2021",
        description: "Advanced cloud security and compliance"
      }
    ]
  }
];