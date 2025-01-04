import { supabase } from "@/integrations/supabase/client";

const initialBlogPosts = [
  {
    title: "My Journey Leveraging AI and Technologies and Key Takeaways",
    slug: "my-journey-leveraging-ai-technologies",
    content: `In the constantly evolving landscape of technology, my journey has been one of relentless curiosity, adaptability, and a commitment to leveraging innovation for meaningful impact. With over two decades of experience in data and technology, this path has been marked by challenges, triumphs, and profound learning moments. Here, I share my story of leveraging AI and cutting-edge technologies to drive transformation and deliver solutions that matter.

The Beginning

My fascination with technology began during my early academic years. Leaving a traditional career path, I pursued a degree in computer science with a vision of utilizing technology to address global challenges. This decision set the stage for a career dedicated to applying data and digital solutions to complex problems.

Embracing Data and AI

At UNHCR, as the Head of the Data Analysis Group (DAG) in Jordan, I saw firsthand the transformative power of AI and data in improving refugee lives. From developing AI-powered predictive models for resettlement prioritization to creating self-service applications that empower refugees to manage their data, every project underscored the immense potential of technology.

Key initiatives such as the Self-Renewal System allowed refugees to update their data autonomously, reducing waiting times by 50%. Similarly, the Digital Petition System, powered by Optical Character Recognition (OCR) and Natural Language Processing (NLP), streamlined feedback processing, improving response times by 70%.

Tackling Challenges

Navigating the complexities of digital transformation wasn't without hurdles. Introducing AI and machine learning in humanitarian settings required addressing skepticism, ethical concerns, and resource constraints. These challenges demanded innovative thinking, collaboration, and a strong ethical framework to ensure that technology served as an enabler of dignity and inclusion.

Cybersecurity and data protection were paramount in every initiative. Conducting penetration tests, implementing GDPR-compliant frameworks, and fostering a culture of privacy were essential steps in ensuring the integrity of sensitive data.

Collaboration and Capacity Building

Technology thrives on collaboration. Partnering with organizations like Microsoft and Google, we brought transformative solutions to life. For instance, integrating AI models with local health systems ensured that 58% of refugees could register for COVID-19 vaccines seamlessly.

Equally crucial was building internal capacity. Training over 200 staff members on tools like Power BI, Azure, and cybersecurity protocols not only enhanced efficiency but also cultivated a culture of innovation.

Key Takeaways

1. AI is a Tool, Not a Panacea: AI's potential lies in its application. Its success depends on understanding the problem, designing solutions with empathy, and ensuring ethical implementation.

2. Cybersecurity is Foundational: In an era of increasing digital dependency, robust data protection measures are non-negotiable. A secure system builds trust and ensures longevity.

3. Collaboration Drives Impact: No single entity can achieve transformative change alone. Partnerships amplify resources, expertise, and reach.

4. Human-Centric Design is Key: Technology must always serve people. Engaging communities in the design and testing phases ensures solutions that truly address their needs.

5. Continuous Learning is Vital: From mastering new tools like Azure to completing certifications in AI ethics, staying updated is essential in a fast-evolving field.

Looking Ahead

As I reflect on this journey, I am filled with gratitude for the opportunities to innovate and the lives positively impacted. The road ahead is one of continued learning, collaboration, and striving to harness technology for greater inclusion and sustainability.

To my readers, I leave this thought: The power of technology lies not just in its capabilities but in our collective ability to use it responsibly and ethically. Together, we can build a future where technology bridges divides and uplifts humanity.

Let's stay connected and continue this dialogue on innovation and impact. Reach out or share your thoughts—your perspectives inspire the next chapter of this journey.

--Shahzad ASGHAR`,
    excerpt: "Reflecting on two decades of leveraging AI and technology for humanitarian impact, sharing key lessons and insights from transformative projects in refugee assistance and digital innovation.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["AI", "Technology", "Innovation", "Leadership", "HumanitarianTech"],
    meta_description: "A personal journey of leveraging AI and technology for humanitarian impact, with key takeaways from two decades of experience in digital transformation.",
    meta_keywords: ["AI", "Technology", "Innovation", "Digital Transformation", "Humanitarian Work", "Leadership", "Career Journey"]
  },
  {
    title: "AI-Powered IVR for Refugee Support",
    slug: "ai-powered-ivr-for-refugee-support",
    content: "AI-based IVR allowing refugees to record queries, which are automatically transcribed, categorized, and routed to relevant units. Accessible via web interface and WhatsApp.",
    excerpt: "An innovative AI-based IVR system designed to support refugees in managing their queries effectively.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["AI", "Automation", "IVR", "RefugeeSupport"],
    meta_description: "An AI-powered IVR system that enhances communication for refugees, ensuring their queries are addressed efficiently.",
    meta_keywords: ["AI", "IVR", "Refugee Support", "Automation"]
  },
  {
    title: "AI-Driven Resettlement Prioritization",
    slug: "ai-driven-resettlement-prioritization",
    content: "Developed AI models integrating socio-economic and vulnerability indicators for resettlement decision-making. Advanced Data Science Application for UNHCR Resettlement Program Optimization.",
    excerpt: "Utilizing AI to optimize resettlement decisions for refugees based on comprehensive data analysis.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["AI", "MachineLearning", "Resettlement"],
    meta_description: "AI-driven models that enhance the resettlement process for refugees by analyzing socio-economic factors.",
    meta_keywords: ["AI", "Resettlement", "Data Science", "UNHCR"]
  },
  {
    title: "UNHCR Jordan Digital Transformation",
    slug: "unhcr-jordan-digital-transformation",
    content: "Digitized 15+ manual processes, including refugee support and back-office operations, leveraging automation and cloud tools.",
    excerpt: "A comprehensive digital transformation initiative that streamlined operations at UNHCR Jordan.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["DigitalTransformation", "Automation", "BackOffice"],
    meta_description: "Transforming UNHCR operations in Jordan through digital solutions and automation.",
    meta_keywords: ["Digital Transformation", "UNHCR", "Automation"]
  },
  {
    title: "Self-Renewal System",
    slug: "self-renewal-system",
    content: "Introduced kiosks for refugees to update personal data using iris scans, reducing manual interviews.",
    excerpt: "A self-service system that empowers refugees to manage their personal data efficiently.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["Automation", "SelfService", "DigitalIdentity"],
    meta_description: "A self-renewal system that enhances data management for refugees through technology.",
    meta_keywords: ["Self-Service", "Digital Identity", "Automation"]
  },
  {
    title: "AI-Enhanced Appointment System",
    slug: "ai-enhanced-appointment-system",
    content: "Automated IVR system for refugees to book appointments with real-time confirmation.",
    excerpt: "An AI-driven appointment system that simplifies scheduling for refugees.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["AI", "AppointmentBooking", "Automation"],
    meta_description: "An innovative appointment booking system that leverages AI for real-time scheduling.",
    meta_keywords: ["AI", "Appointment Booking", "Automation"]
  },
  {
    title: "COVID-19 Vaccine Data Highway",
    slug: "covid-19-vaccine-data-highway",
    content: "Integrated refugee data with government systems to enable vaccine registrations.",
    excerpt: "A data integration project that facilitated COVID-19 vaccine access for refugees.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["DataIntegration", "HealthTech"],
    meta_description: "A project that streamlined vaccine registration for refugees through data integration.",
    meta_keywords: ["COVID-19", "Vaccine", "Data Integration"]
  },
  {
    title: "Operational Dashboards",
    slug: "operational-dashboards",
    content: "Developed 50+ dashboards for real-time insights on program metrics and refugee status.",
    excerpt: "Dashboards that provide critical insights for operational decision-making.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["DataVisualization", "Dashboards", "RealTimeAnalytics"],
    meta_description: "Operational dashboards that enhance visibility into program metrics and refugee status.",
    meta_keywords: ["Dashboards", "Data Visualization", "Real-Time Analytics"]
  },
  {
    title: "Big Data Platform",
    slug: "big-data-platform",
    content: "Unified multiple data sources for comprehensive analysis and reporting.",
    excerpt: "A big data platform that consolidates information for better decision-making.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["BigData", "DataIntegration", "Analytics"],
    meta_description: "A platform that integrates diverse data sources for enhanced analysis and reporting.",
    meta_keywords: ["Big Data", "Data Integration", "Analytics"]
  },
  {
    title: "Digital Petition System",
    slug: "digital-petition-system",
    content: "AI-driven system for automating refugee feedback processing using OCR and NLP.",
    excerpt: "A system that streamlines feedback collection and processing for refugees.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["AI", "OCR", "Automation"],
    meta_description: "An AI-driven system that enhances feedback processing for refugees.",
    meta_keywords: ["AI", "Feedback", "Automation"]
  },
  {
    title: "Electricity Subsidy Tool",
    slug: "electricity-subsidy-tool",
    content: "Digitized process for refugees to apply for government utility subsidies.",
    excerpt: "A tool that simplifies the application process for utility subsidies.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["Automation", "SubsidyManagement"],
    meta_description: "A digital tool that facilitates subsidy applications for refugees.",
    meta_keywords: ["Subsidy", "Automation"]
  },
  {
    title: "Penetration Testing and Security Audits",
    slug: "penetration-testing-and-security-audits",
    content: "Led cybersecurity initiatives, ensuring secure certifications for critical applications.",
    excerpt: "Cybersecurity measures that protect sensitive data and applications.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["Cybersecurity", "RiskManagement"],
    meta_description: "Cybersecurity initiatives that enhance the security of applications.",
    meta_keywords: ["Cybersecurity", "Security Audits"]
  },
  {
    title: "Data Protection Policies",
    slug: "data-protection-policies",
    content: "Developed encryption and anonymization protocols for secure refugee data management.",
    excerpt: "Policies that ensure the protection of sensitive data.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["DataProtection", "Cybersecurity", "Compliance"],
    meta_description: "Data protection policies that safeguard sensitive information.",
    meta_keywords: ["Data Protection", "Cybersecurity"]
  },
  {
    title: "Azure Cloud Migration",
    slug: "azure-cloud-migration",
    content: "Migrated operational systems to Azure for scalability and resilience.",
    excerpt: "A cloud migration project that enhances system performance and reliability.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["CloudIntegration", "Azure", "Scalability"],
    meta_description: "A project that migrates systems to Azure for improved scalability.",
    meta_keywords: ["Cloud Migration", "Azure"]
  },
  {
    title: "Hakeem Data Highway Integration",
    slug: "hakeem-data-highway-integration",
    content: "Enabled real-time health record validation through API integration with national health systems.",
    excerpt: "A project that integrates health data for better service delivery.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["DataIntegration", "HealthTech", "CloudAPI"],
    meta_description: "Integration of health records for improved service delivery.",
    meta_keywords: ["Health Integration", "API"]
  },
  {
    title: "Building Refugee Capacity with Tech Giants",
    slug: "building-refugee-capacity-with-tech-giants",
    content: "Partnered with Microsoft to provide IT and data training for refugees, promoting entrepreneurship.",
    excerpt: "A capacity-building initiative that empowers refugees through technology.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["CapacityBuilding", "TechCollaboration", "Entrepreneurship"],
    meta_description: "A partnership that enhances the skills of refugees in technology.",
    meta_keywords: ["Capacity Building", "Training"]
  },
  {
    title: "Training on Advanced Analytics",
    slug: "training-on-advanced-analytics",
    content: "Conducted 200+ staff training sessions on data analysis, cloud tools, and cybersecurity.",
    excerpt: "Training programs that enhance staff capabilities in technology.",
    author: "Shahzad ASGHAR",
    status: "published",
    tags: ["CapacityBuilding", "Training", "DataAnalytics"],
    meta_description: "Training sessions that improve staff skills in analytics and technology.",
    meta_keywords: ["Training", "Analytics"]
  }
];

export const createBlogPost = async (post: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  tags?: string[];
  meta_description?: string;
  meta_keywords?: string[];
  status?: string;
  published_at?: string;
}) => {
  console.log('Creating blog post with data:', { ...post, content: '...[content truncated]...' });
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error from Supabase:', error);
    throw error;
  }
  
  console.log('Blog post created successfully:', data);
  return data;
};

export const initializeBlogPosts = async () => {
  console.log('Initializing blog posts...');
  
  for (const post of initialBlogPosts) {
    try {
      console.log(`Checking if blog post exists: ${post.slug}`);
      const { data: existingPost, error } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .maybeSingle();
      
      if (error) {
        console.error(`Error checking for existing post ${post.slug}:`, error);
        continue;
      }

      if (!existingPost) {
        console.log(`Creating blog post: ${post.title}`);
        await createBlogPost({
          ...post,
          published_at: new Date().toISOString(),
        });
      } else {
        console.log(`Blog post already exists: ${post.title}`);
      }
    } catch (error) {
      console.error(`Error processing blog post ${post.title}:`, error);
      // Continue with next post even if one fails
      continue;
    }
  }
  
  console.log('Blog posts initialization completed');
};