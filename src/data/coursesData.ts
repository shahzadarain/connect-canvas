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
        description: "Techniques to fine-tune large language models"
      },
      {
        title: "RAG and Fine-Tuning Explained",
        platform: "LinkedIn",
        instructor: "Morten Rand-Hendriksen",
        completed: "Jul 2024",
        description: "Understanding Retrieval-Augmented Generation and fine-tuning methods"
      },
      {
        title: "IBM Generative AI Engineering Professional Certificate",
        platform: "Coursera",
        completed: "May 2024",
        description: "Comprehensive training in generative AI engineering and applications"
      }
    ]
  },
  {
    category: "Data Analytics & Visualization",
    items: [
      {
        title: "Power BI Essential Training",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Various",
        description: "Master Power BI fundamentals for data visualization"
      },
      {
        title: "Statistics Foundations Series",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Various",
        description: "Comprehensive statistics training"
      },
      {
        title: "Advanced and Specialized Statistics with Stata",
        platform: "LinkedIn",
        instructor: "Franz Buscha",
        completed: "Jan 2021",
        description: "Advanced statistical analysis using Stata"
      },
      {
        title: "Google Data Analytics Professional Certificate",
        platform: "Coursera",
        completed: "July 2023",
        description: "Comprehensive data analytics training from Google"
      }
    ]
  },
  {
    category: "Cybersecurity & Privacy",
    items: [
      {
        title: "GDPR Compliance: Essential Training",
        platform: "LinkedIn",
        instructor: "Mandy Huth",
        completed: "Dec 2022",
        description: "Understanding GDPR fundamentals"
      },
      {
        title: "Creating a Culture of Privacy",
        platform: "LinkedIn",
        instructor: "Kalinda Raina",
        completed: "Dec 2022",
        description: "Building privacy-focused organizational culture"
      },
      {
        title: "CSSLP Certification Preparation Series",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Comprehensive secure software lifecycle training"
      },
      {
        title: "IBM Generative AI for Cybersecurity Professionals",
        platform: "Coursera",
        completed: "October 2024",
        description: "Application of generative AI in cybersecurity"
      }
    ]
  },
  {
    category: "Professional Development",
    items: [
      {
        title: "Strategic Thinking",
        platform: "LinkedIn",
        instructor: "Dorie Clark",
        completed: "Nov 2023",
        description: "Developing strategic decision-making skills"
      },
      {
        title: "Project Management Skills for Leaders",
        platform: "LinkedIn",
        instructor: "Dana Brownlee",
        completed: "Dec 2022",
        description: "Essential project management skills"
      },
      {
        title: "Business Process Improvement",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Jun 2021",
        description: "Process optimization techniques"
      },
      {
        title: "GIS, Mapping, and Spatial Analysis",
        platform: "Coursera",
        completed: "March 2023",
        description: "Fundamentals of Geographic Information Systems"
      }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      {
        title: "Cybersecurity with Cloud Computing",
        platform: "LinkedIn",
        instructor: "Malcolm Shore",
        completed: "Dec 2021",
        description: "Cloud security fundamentals"
      },
      {
        title: "Azure Administration: Business Continuity",
        platform: "LinkedIn",
        instructor: "Matt Hester",
        completed: "Feb 2020",
        description: "Azure business continuity solutions"
      },
      {
        title: "Learning Amazon Web Services (AWS) for Developers",
        platform: "LinkedIn",
        instructor: "Bear Cahill",
        completed: "Feb 2020",
        description: "AWS development fundamentals"
      },
      {
        title: "Learning the Elastic Stack",
        platform: "LinkedIn",
        instructor: "Emmanuel Henri",
        completed: "Feb 2020",
        description: "ELK Stack implementation"
      }
    ]
  }
];