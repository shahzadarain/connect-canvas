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
    category: "Artificial Intelligence and Machine Learning",
    items: [
      {
        title: "IBM Generative AI Engineering Professional Certificate",
        platform: "Coursera",
        instructor: "IBM Team",
        completed: "May 2024",
        description: "Comprehensive certification covering Python for data science, AI development, and machine learning fundamentals",
        featured: true
      },
      {
        title: "IBM Generative AI for Cybersecurity Professionals",
        platform: "Coursera",
        instructor: "IBM Team",
        completed: "October 2024",
        description: "Advanced training in generative AI applications for cybersecurity, including prompt engineering",
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
    category: "Cybersecurity and Privacy",
    items: [
      {
        title: "CSSLP Certification Series",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Comprehensive secure software lifecycle professional certification",
        featured: true
      },
      {
        title: "CCSP Certification Series",
        platform: "LinkedIn",
        instructor: "Mike Chapple",
        completed: "Dec 2021",
        description: "Advanced cloud security professional certification preparation",
        featured: true
      },
      {
        title: "Privacy by Design Series",
        platform: "LinkedIn",
        instructor: "Nishant Bhajaria",
        completed: "Dec 2022",
        description: "Implementation of privacy-first approaches in data management"
      },
      {
        title: "Creating a Culture of Privacy",
        platform: "LinkedIn",
        instructor: "Kalinda Raina",
        completed: "Dec 2022",
        description: "Strategies for fostering privacy-centric organizational culture"
      },
      {
        title: "Understanding Zero Trust",
        platform: "LinkedIn",
        instructor: "Malcolm Shore",
        completed: "Dec 2021",
        description: "Implementation of Zero Trust security architecture"
      },
      {
        title: "Cloud Security Concepts",
        platform: "LinkedIn",
        instructor: "David Linthicum",
        completed: "Dec 2021",
        description: "Advanced cloud security and compliance strategies"
      }
    ]
  },
  {
    category: "Data Analytics and Visualization",
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
        completed: "2021",
        description: "Advanced Power BI skills for data visualization",
        featured: true
      },
      {
        title: "Statistics Foundations Series",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "2021",
        description: "Comprehensive statistics training from basics to advanced"
      },
      {
        title: "Data Ethics: Making Data-Driven Decisions",
        platform: "LinkedIn",
        instructor: "Doug Rose",
        completed: "2022",
        description: "Ethical frameworks for data-driven decision making"
      },
      {
        title: "Advanced Statistics with Stata",
        platform: "LinkedIn",
        instructor: "Franz Buscha",
        completed: "2021",
        description: "Advanced statistical analysis using Stata"
      }
    ]
  },
  {
    category: "Cloud Computing and IT Strategy",
    items: [
      {
        title: "Azure Administration Series",
        platform: "LinkedIn",
        instructor: "Matt Hester",
        completed: "Feb 2020",
        description: "Comprehensive Azure cloud administration",
        featured: true
      },
      {
        title: "AWS for Developers",
        platform: "LinkedIn",
        instructor: "Bear Cahill",
        completed: "Feb 2020",
        description: "Development fundamentals for AWS"
      },
      {
        title: "Learning Hadoop",
        platform: "LinkedIn",
        instructor: "Lynn Langit",
        completed: "Feb 2020",
        description: "Big data processing with Hadoop"
      },
      {
        title: "Creating Your IT Strategy",
        platform: "LinkedIn",
        instructor: "Peter High",
        completed: "Feb 2020",
        description: "Strategic IT planning and implementation"
      }
    ]
  },
  {
    category: "Project Management and Leadership",
    items: [
      {
        title: "Strategic Thinking",
        platform: "LinkedIn",
        instructor: "Dorie Clark",
        completed: "Nov 2023",
        description: "Advanced strategic decision-making",
        featured: true
      },
      {
        title: "Project Management Skills for Leaders",
        platform: "LinkedIn",
        instructor: "Dana Brownlee",
        completed: "Dec 2022",
        description: "Essential project management leadership skills"
      },
      {
        title: "Business Process Improvement",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Jun 2021",
        description: "Process optimization techniques"
      },
      {
        title: "Change Management Foundations",
        platform: "LinkedIn",
        instructor: "Bob McGannon",
        completed: "Feb 2020",
        description: "Leading organizational change"
      }
    ]
  },
  {
    category: "Business Analysis and Design",
    items: [
      {
        title: "Business Analysis Foundations",
        platform: "LinkedIn",
        instructor: "Greta Blash",
        completed: "Jan 2021",
        description: "Core business analysis methodologies",
        featured: true
      },
      {
        title: "Design Thinking Approach",
        platform: "LinkedIn",
        instructor: "Big Think",
        completed: "Aug 2022",
        description: "Customer-centric design methodology"
      },
      {
        title: "UX Foundations: Interaction Design",
        platform: "LinkedIn",
        instructor: "David Hogue",
        completed: "Feb 2020",
        description: "Principles of user interaction design"
      },
      {
        title: "Business Process Modeling",
        platform: "LinkedIn",
        instructor: "Haydn Thomas",
        completed: "Oct 2020",
        description: "Process modeling and optimization"
      }
    ]
  }
];