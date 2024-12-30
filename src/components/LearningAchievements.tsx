import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Course {
  title: string;
  platform: string;
  instructor?: string;
  completed: string;
  description?: string;
}

const courses: { category: string; items: Course[] }[] = [
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
        title: "Strategic Thinking",
        platform: "LinkedIn",
        instructor: "Dorie Clark",
        completed: "Nov 2023",
        description: "Developing strategic decision-making skills"
      },
      {
        title: "GDPR Compliance: Essential Training",
        platform: "LinkedIn",
        instructor: "Mandy Huth",
        completed: "Dec 2022",
        description: "Understanding GDPR fundamentals and compliance"
      },
      {
        title: "Creating a Culture of Privacy",
        platform: "LinkedIn",
        instructor: "Kalinda Raina",
        completed: "Dec 2022",
        description: "Fostering privacy-centric organizational culture"
      },
      {
        title: "Project Management Skills for Leaders",
        platform: "LinkedIn",
        instructor: "Dana Brownlee",
        completed: "Dec 2022",
        description: "Essential project management and leadership skills"
      },
      {
        title: "Mindful Working: 11 Ways to Improve How You Work",
        platform: "LinkedIn",
        instructor: "Sounds True and Tara Brach",
        completed: "Oct 2022",
        description: "Discover mindfulness techniques to enhance productivity"
      },
      {
        title: "A Design Thinking Approach to Putting the Customer First",
        platform: "LinkedIn",
        instructor: "Big Think",
        completed: "Aug 2022",
        description: "Learn to apply design thinking principles to prioritize customer needs"
      },
      {
        title: "Data Ethics: Making Data-Driven Decisions",
        platform: "LinkedIn",
        instructor: "Doug Rose",
        completed: "Apr 2022",
        description: "Understand the ethical considerations in data-driven decision-making"
      },
      {
        title: "CSSLP Cert Prep: Secure Software Concepts, Lifecycle Management, Deployment, and Operations",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Prepare for the Certified Secure Software Lifecycle Professional (CSSLP) certification"
      },
      {
        title: "Cybersecurity with Cloud Computing",
        platform: "LinkedIn",
        instructor: "Malcolm Shore",
        completed: "Dec 2021",
        description: "Examine cybersecurity challenges in cloud computing environments"
      },
      {
        title: "Power BI Essential Training",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Various",
        description: "Master the fundamentals of Microsoft Power BI"
      },
      {
        title: "Statistics Foundations Series",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Various",
        description: "Build a solid foundation in statistics"
      },
      {
        title: "Data-Driven Learning Design",
        platform: "LinkedIn",
        instructor: "Lori Niles",
        completed: "Jan 2022",
        description: "Learn to design effective learning experiences"
      },
      {
        title: "Learning Information Governance",
        platform: "LinkedIn",
        instructor: "Robert Smallwood",
        completed: "Jan 2021",
        description: "Understand the principles of information governance"
      },
      {
        title: "Advanced and Specialized Statistics with Stata",
        platform: "LinkedIn",
        instructor: "Franz Buscha",
        completed: "Jan 2021",
        description: "Explore advanced statistical techniques using Stata software"
      },
      {
        title: "Enhancing Team Innovation",
        platform: "LinkedIn",
        instructor: "Dr. Gemma Leigh Roberts",
        completed: "Feb 2020",
        description: "Discover strategies to boost team creativity and innovation"
      },
      {
        title: "Statistics Foundations: 2",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Jan 2021",
        description: "Build upon your statistical knowledge"
      },
      {
        title: "CSSLP Cert Prep: 8 Supply Chain and Software Acquisition",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Prepare for the CSSLP certification by understanding supply chain risks"
      },
      {
        title: "CSSLP Cert Prep: 7 Software Deployment, Operations, and Maintenance",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Learn best practices for securely deploying software systems"
      },
      {
        title: "CSSLP Cert Prep: 6 Secure Lifecycle Management",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Understand how to manage the software development lifecycle with a focus on security"
      },
      {
        title: "CSSLP Cert Prep: 2 Secure Software Requirements",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Explore how to define and document secure software requirements"
      },
      {
        title: "CSSLP Cert Prep: 1 Secure Software Concepts",
        platform: "LinkedIn",
        instructor: "Jerod Brennen",
        completed: "Dec 2021",
        description: "Gain foundational knowledge of secure software concepts"
      },
      {
        title: "CCSP Cert Prep: 4 Cloud Application Security (2019)",
        platform: "LinkedIn",
        instructor: "Mike Chapple",
        completed: "Dec 2021",
        description: "Prepare for the CCSP exam by learning about cloud application security"
      },
      {
        title: "CCSP Cert Prep: 3 Cloud Platform and Infrastructure Security (2019)",
        platform: "LinkedIn",
        instructor: "Mike Chapple",
        completed: "Dec 2021",
        description: "Understand cloud platform and infrastructure security"
      },
      {
        title: "CCSP Cert Prep: 2 Cloud Data Security",
        platform: "LinkedIn",
        instructor: "Mike Chapple",
        completed: "Dec 2021",
        description: "Focus on cloud data security concepts"
      },
      {
        title: "CompTIA CySA+ (CS0-002) Cert Prep: 3 Identity and Access Management",
        platform: "LinkedIn",
        instructor: "Mike Chapple",
        completed: "Dec 2021",
        description: "Prepare for the CompTIA Cybersecurity Analyst certification"
      },
      {
        title: "CompTIA Security+ (SY0-601) Cert Prep: 1 Threats, Attacks, and Vulnerabilities",
        platform: "LinkedIn",
        instructor: "Mike Chapple",
        completed: "Dec 2021",
        description: "Prepare for the CompTIA Security+ certification"
      },
      {
        title: "Understanding Zero Trust",
        platform: "LinkedIn",
        instructor: "Malcolm Shore",
        completed: "Dec 2021",
        description: "Learn about the Zero Trust security model"
      },
      {
        title: "Cloud Security Concepts: Services and Compliance (2021)",
        platform: "LinkedIn",
        instructor: "David Linthicum",
        completed: "Dec 2021",
        description: "Understand cloud security services and compliance requirements"
      },
      {
        title: "IT Security Foundations: Core Concepts (2019)",
        platform: "LinkedIn",
        instructor: "Lisa Bock",
        completed: "Dec 2021",
        description: "Gain foundational knowledge in IT security"
      },
      {
        title: "Business Process Improvement",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Jun 2021",
        description: "Learn techniques to analyze and improve business processes"
      },
      {
        title: "Creating a Culture of Change",
        platform: "LinkedIn",
        instructor: "Jerry Pico",
        completed: "Aug 2020",
        description: "Explore strategies to foster a culture that embraces change"
      },
      {
        title: "Data Ethics: Making Data-Driven Decisions (2020)",
        platform: "LinkedIn",
        instructor: "Doug Rose",
        completed: "Jan 2021",
        description: "Understand the ethical considerations in data-driven decision-making"
      },
      {
        title: "Business Analysis Foundations",
        platform: "LinkedIn",
        instructor: "Greta Blash",
        completed: "Jan 2021",
        description: "Gain foundational knowledge in business analysis"
      },
      {
        title: "Learning Information Governance",
        platform: "LinkedIn",
        instructor: "Robert Smallwood",
        completed: "Jan 2021",
        description: "Understand the principles of information governance"
      },
      {
        title: "Six Sigma: Black Belt",
        platform: "LinkedIn",
        instructor: "Richard Chua",
        completed: "Mar 2020",
        description: "Master advanced Six Sigma techniques"
      },
      {
        title: "Exchange 2016: Compliance, Archiving, eDiscovery, and Auditing",
        platform: "LinkedIn",
        instructor: "Scott M Burrell",
        completed: "Aug 2020",
        description: "Learn how to manage compliance features in Exchange Server 2016"
      },
      {
        title: "Strategic Negotiation",
        platform: "LinkedIn",
        instructor: "Mike Figliuolo",
        completed: "Apr 2020",
        description: "Develop negotiation skills to advance your interests"
      },
      {
        title: "Change Management Foundations (2016)",
        platform: "LinkedIn",
        instructor: "Bob McGannon",
        completed: "Feb 2020",
        description: "Understand the fundamentals of change management"
      },
      {
        title: "Blockchain for Developers: Hyperledger Fabric on Azure (2019)",
        platform: "LinkedIn",
        instructor: "Gurinder Singh Mann",
        completed: "Feb 2020",
        description: "Learn how to develop blockchain applications using Hyperledger Fabric"
      },
      {
        title: "Communicating with Confidence (2015)",
        platform: "LinkedIn",
        instructor: "Jeff Ansell",
        completed: "Nov 2020",
        description: "Enhance your communication skills"
      },
      {
        title: "Power BI Essential Training (2020)",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Jan 2021",
        description: "Master the fundamentals of Microsoft Power BI"
      },
      {
        title: "Enterprise Architecture Foundations",
        platform: "LinkedIn",
        instructor: "Dave Swersky",
        completed: "Aug 2020",
        description: "Gain an understanding of enterprise architecture principles"
      },
      {
        title: "Achieving GDPR Compliance with Microsoft Technologies",
        platform: "LinkedIn",
        instructor: "Andrew Bettany",
        completed: "Jan 2021",
        description: "Learn how to utilize Microsoft tools for GDPR compliance"
      },
      {
        title: "Managing Your Anxiety While Presenting",
        platform: "LinkedIn",
        instructor: "Matt Abrahams",
        completed: "Feb 2021",
        description: "Develop strategies to manage anxiety during presentations"
      },
      {
        title: "GDPR Compliance: Essential Training (2018)",
        platform: "LinkedIn",
        instructor: "Mandy Huth",
        completed: "Feb 2020",
        description: "Understand the key requirements of GDPR"
      },
      {
        title: "Statistics Foundations: 1",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Jan 2021",
        description: "Gain a solid foundation in statistics"
      },
      {
        title: "Power BI: Dashboards for Beginners (2020)",
        platform: "LinkedIn",
        instructor: "Joshua Rischin",
        completed: "Jan 2021",
        description: "Learn to create interactive dashboards in Power BI"
      },
      {
        title: "Advanced and Specialized Statistics with Stata",
        platform: "LinkedIn",
        instructor: "Franz Buscha",
        completed: "Jan 2021",
        description: "Explore advanced statistical techniques using Stata"
      },
      {
        title: "Statistics Foundations: 3",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "Jan 2021",
        description: "Delve deeper into statistical methods"
      },
      {
        title: "How to Boost Your Creativity at Home in 10 Days",
        platform: "LinkedIn",
        instructor: "Dave Birss",
        completed: "Dec 2020",
        description: "Discover practical exercises to enhance your creativity"
      },
      {
        title: "Learning Data Analytics",
        platform: "LinkedIn",
        instructor: "Robin Hunt",
        completed: "Nov 2020",
        description: "Acquire the skills to analyze data effectively"
      },
      {
        title: "Learning ITIL® (2019)",
        platform: "LinkedIn",
        instructor: "David Pultorak",
        completed: "Feb 2020",
        description: "Understand the ITIL framework"
      },
      {
        title: "Business Analysis Foundations: Business Process Modeling",
        platform: "LinkedIn",
        instructor: "Haydn Thomas",
        completed: "Oct 2020",
        description: "Learn to model business processes"
      },
      {
        title: "Learning Data Science: Understanding the Basics",
        platform: "LinkedIn",
        instructor: "Doug Rose",
        completed: "Sep 2020",
        description: "Gain an introduction to data science"
      },
      {
        title: "Critical Thinking for Better Judgment and Decision-Making",
        platform: "LinkedIn",
        instructor: "Becki Saltzman",
        completed: "Aug 2020",
        description: "Enhance your critical thinking skills"
      },
      {
        title: "Supply Chain Foundations (2014)",
        platform: "LinkedIn",
        instructor: "Eddie Davila",
        completed: "May 2020",
        description: "Understand the fundamentals of supply chain management"
      },
      {
        title: "Power BI Essential Training (2019)",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Jan 2020",
        description: "Master the essentials of Power BI"
      },
      {
        title: "Learning Microsoft Power BI Desktop (2018)",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Jan 2020",
        description: "Learn to use Power BI Desktop for data analysis"
      },
      {
        title: "Power BI Data Modeling with DAX",
        platform: "LinkedIn",
        instructor: "Gini von Courter",
        completed: "Mar 2020",
        description: "Develop skills in data modeling and DAX"
      },
      {
        title: "The Data Science of Healthcare, Medicine, and Public Health, with Barton Poulson (2018)",
        platform: "LinkedIn",
        instructor: "Barton Poulson",
        completed: "Mar 2020",
        description: "Explore how data science is applied in healthcare"
      },
      {
        title: "Creating Great First Impressions",
        platform: "LinkedIn",
        instructor: "Vanessa Van Edwards",
        completed: "Feb 2020",
        description: "Learn techniques to make positive first impressions"
      },
      {
        title: "Azure Administration: Business Continuity",
        platform: "LinkedIn",
        instructor: "Matt Hester",
        completed: "Feb 2020",
        description: "Understand how to implement business continuity solutions in Azure"
      },
      {
        title: "Visualizing Geospatial Data with Power Map in Excel",
        platform: "LinkedIn",
        instructor: "Chris Dutton",
        completed: "Feb 2020",
        description: "Learn to visualize geospatial data using Power Map in Excel"
      },
      {
        title: "Learning Google Firebase for Flutter",
        platform: "LinkedIn",
        instructor: "Chiu-Ki Chan",
        completed: "Feb 2020",
        description: "Discover how to integrate Google Firebase with Flutter"
      },
      {
        title: "Learning Amazon Web Services (AWS) for Developers (2018)",
        platform: "LinkedIn",
        instructor: "Bear Cahill",
        completed: "Feb 2020",
        description: "Gain an understanding of AWS services"
      },
      {
        title: "Learning Hadoop (2015)",
        platform: "LinkedIn",
        instructor: "Lynn Langit",
        completed: "Feb 2020",
        description: "Learn the basics of Hadoop and its ecosystem"
      },
      {
        title: "Creating Your IT Strategy",
        platform: "LinkedIn",
        instructor: "Peter High",
        completed: "Feb 2020",
        description: "Develop the skills to create an effective IT strategy"
      },
      {
        title: "Excel Essential Training (Microsoft 365) (2018)",
        platform: "LinkedIn",
        instructor: "Dennis Taylor",
        completed: "Feb 2020",
        description: "Master the essentials of Microsoft Excel"
      },
      {
        title: "UX Foundations: Interaction Design",
        platform: "LinkedIn",
        instructor: "David Hogue",
        completed: "Feb 2020",
        description: "Learn the principles of interaction design"
      },
      {
        title: "Enhancing Team Innovation",
        platform: "LinkedIn",
        instructor: "Dr. Gemma Leigh Roberts",
        completed: "Feb 2020",
        description: "Discover strategies to foster a culture of innovation"
      },
      {
        title: "Negotiating: A Toolkit for Advancing Your Interests",
        platform: "LinkedIn",
        instructor: "Big Think",
        completed: "Feb 2020",
        description: "Develop negotiation skills to effectively advocate for your interests"
      },
      {
        title: "Power BI Top Skills (2019)",
        platform: "LinkedIn",
        instructor: "John David Ariansen and Madecraft",
        completed: "Feb 2020",
        description: "Learn top Power BI skills for business intelligence"
      },
      {
        title: "Excel Business Intelligence: Power Pivot and DAX",
        platform: "LinkedIn",
        instructor: "Chris Dutton",
        completed: "Feb 2020",
        description: "Enhance your Excel capabilities with Power Pivot and DAX"
      },
      {
        title: "Learning Google Flutter for Mobile Developers",
        platform: "LinkedIn",
        instructor: "Emmanuel Henri",
        completed: "Feb 2020",
        description: "Get introduced to Google Flutter for mobile applications"
      },
      {
        title: "Learning the Elastic Stack (2018)",
        platform: "LinkedIn",
        instructor: "Emmanuel Henri",
        completed: "Feb 2020",
        description: "Understand the components of the Elastic Stack"
      },
      {
        title: "Project Online Reporting with Power BI",
        platform: "LinkedIn",
        instructor: "John Riopel",
        completed: "Feb 2020",
        description: "Learn to integrate Project Online with Power BI"
      }
    ]
  }
];

const LearningAchievements = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Continuous Learning Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              {courses.map((category, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {category.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {category.items.map((course, courseIndex) => (
                        <div
                          key={courseIndex}
                          className="bg-card rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{course.title}</h3>
                            <Badge variant="secondary">{course.completed}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {course.platform} | {course.instructor}
                            </p>
                            {course.description && (
                              <p className="mt-1">{course.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default LearningAchievements;
