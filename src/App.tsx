import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AIHumanitarian from "./pages/AIHumanitarian";
import AIHumanitarianTraining from "./pages/AIHumanitarianTraining";
import NotFound from "./pages/NotFound";
import { createBlogPost } from "./utils/blogUtils";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const initializeBlog = async () => {
      console.log("Checking if we need to create blog posts...");
      
      try {
        // First blog post initialization
        const { data: existingFirstPost } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', 'ai-transforming-global-development-un-experience')
          .single();

        if (!existingFirstPost) {
          console.log("Creating first blog post...");
          const firstPost = {
            title: "How AI is Transforming Global Development: Insights from My UN Experience",
            slug: "ai-transforming-global-development-un-experience",
            content: `// ... keep existing code (first blog post content)`,
            excerpt: "Explore how artificial intelligence is revolutionizing global development through UN initiatives, from poverty alleviation to healthcare and climate change mitigation.",
            author: "Shahzad ASGHAR",
            tags: ["AI", "United Nations", "Global Development", "Healthcare", "Climate Change", "Poverty Alleviation"],
            meta_description: "Discover how AI is transforming global development through UN initiatives in healthcare, climate change, and poverty alleviation, based on firsthand experience.",
            meta_keywords: ["AI in development", "UN technology", "global healthcare", "climate change AI", "poverty alleviation", "artificial intelligence UN", "sustainable development"],
            status: "published",
            published_at: new Date().toISOString()
          };

          await createBlogPost(firstPost);
          console.log("First blog post created successfully!");
        }

        // Second blog post initialization
        const { data: existingSecondPost } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', 'ai-role-in-un-sustainable-development-goals')
          .single();

        if (!existingSecondPost) {
          console.log("Creating second blog post...");
          const secondPost = {
            title: "The Role of Artificial Intelligence in Achieving the UN Sustainable Development Goals (SDGs)",
            slug: "ai-role-in-un-sustainable-development-goals",
            content: `// ... keep existing code (second blog post content)`,
            excerpt: "Discover how artificial intelligence is accelerating progress towards the UN Sustainable Development Goals, from fighting hunger to climate action.",
            author: "Shahzad ASGHAR",
            tags: ["AI", "SDGs", "Sustainable Development", "United Nations", "Innovation", "Climate Action", "Education"],
            meta_description: "Explore how AI technologies are helping achieve the UN Sustainable Development Goals across various sectors including agriculture, healthcare, energy, and education.",
            meta_keywords: ["AI SDGs", "sustainable development", "artificial intelligence UN", "climate action", "zero hunger", "quality education", "clean energy", "innovation"],
            status: "published",
            published_at: new Date().toISOString()
          };

          await createBlogPost(secondPost);
          console.log("Second blog post created successfully!");
        }

        // Third blog post initialization
        const { data: existingThirdPost } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', 'ethical-ai-lessons-learned-from-un')
          .single();

        if (!existingThirdPost) {
          console.log("Creating third blog post...");
          const thirdPost = {
            title: "Ethical AI: Lessons Learned from Working with the United Nations",
            slug: "ethical-ai-lessons-learned-from-un",
            content: `// ... keep existing code (third blog post content)`,
            excerpt: "Explore the ethical challenges and solutions in implementing AI within global organizations, drawing from United Nations experience.",
            author: "Shahzad ASGHAR",
            tags: ["AI Ethics", "United Nations", "Data Privacy", "Digital Divide", "Bias in AI", "Ethical Technology"],
            meta_description: "Learn about the ethical challenges and solutions in AI implementation from UN experience, including bias, transparency, privacy, and digital divide issues.",
            meta_keywords: ["ethical AI", "AI bias", "data privacy", "digital divide", "UN technology", "AI transparency", "AI governance", "responsible AI"],
            status: "published",
            published_at: new Date().toISOString()
          };

          await createBlogPost(thirdPost);
          console.log("Third blog post created successfully!");
        }

        // Fourth blog post initialization
        const { data: existingFourthPost } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', 'ai-for-good-technology-shaping-humanitarian-work')
          .single();

        if (!existingFourthPost) {
          console.log("Creating fourth blog post...");
          const fourthPost = {
            title: "AI for Good: How Technology is Shaping the Future of Humanitarian Work",
            slug: "ai-for-good-technology-shaping-humanitarian-work",
            content: `Artificial intelligence (AI) is not just a buzzword—it is fundamentally reshaping how humanitarian organizations address pressing global challenges. By streamlining processes, predicting needs, and optimizing resource allocation, AI is becoming an indispensable tool in the quest for more effective humanitarian responses. Below, we explore specific AI tools and initiatives that are making a difference globally and highlight groundbreaking projects implemented in Jordan under the Data Analysis Group (DAG).

Global AI Initiatives in Humanitarian Work
1. Signpost by International Rescue Committee (IRC):
This AI-powered platform provides real-time, multilingual information to displaced populations. By using AI chatbots and mobile apps, Signpost has helped millions of people navigate crises more effectively.

2. Ulangizi AI Chatbot in Malawi:
Designed for rural farmers, this AI chatbot offers agricultural advice in local languages. It's an example of how AI can empower underserved communities with localized solutions.

3. Tarjimly Translation Services:
This app, supported by Google, connects refugees with volunteer interpreters. AI integration enhances translation accuracy, especially for lesser-known languages, bridging communication gaps during critical resettlement processes.

4. AI for Disaster Response:
AI systems analyze satellite imagery, predict disaster-prone areas, and allocate resources more efficiently, enabling faster responses to natural calamities.

AI Projects in Jordan: A Focus on Refugees and Humanitarian Support
As Head of the Data Analysis Group (DAG), my team and I have led several initiatives that leverage AI to improve the lives of refugees and optimize humanitarian efforts:

1. Predictive Analytics for Refugee Movements:
Using machine learning models, we developed systems to analyze trends and predict refugee movements across Jordan. This helped humanitarian agencies preemptively allocate resources to high-need areas, ensuring timely and efficient support.

2. AI-Driven Feedback System for Refugees:
Our team built an AI-powered interactive voice response (IVR) system integrated with a chatbot to collect, transcribe, and categorize feedback from refugees. This system allowed refugees to share their concerns and needs in real time, while providing actionable insights to stakeholders.

4. Skill Mapping Using AI:
We leveraged AI to integrate and analyze skill data for refugees across Jordan. This enabled better matching of refugees' capabilities with employment opportunities, fostering self-reliance and economic inclusion.

5. Heatmaps for Vulnerability Analysis:
Using AI-powered geographic information systems (GIS), we created dynamic heatmaps to identify areas of high vulnerability among refugees. This facilitated targeted interventions and enhanced the efficiency of aid distribution.

6. Enhanced Needs Assessments with AI:
To streamline data collection for needs assessments, we integrated AI algorithms that categorized responses and identified trends. This enabled quicker, more reliable assessments to inform program planning.

Ethical Considerations and the Path Forward
While AI offers transformative potential, its implementation must be accompanied by ethical vigilance. Ensuring data privacy, addressing algorithmic biases, and involving affected communities in the design process are vital steps toward equitable use of AI in humanitarian efforts.

AI is not just shaping the future of humanitarian work—it is redefining what is possible. Through innovation and collaboration, we can ensure these technologies continue to serve as tools for hope and resilience.`,
            excerpt: "Discover how AI is revolutionizing humanitarian work through real-world applications and projects implemented in Jordan, focusing on refugee support and crisis response.",
            author: "Shahzad ASGHAR",
            tags: ["AI for Good", "Humanitarian Work", "Refugee Support", "Crisis Response", "Data Analysis", "Innovation"],
            meta_description: "Learn how AI is transforming humanitarian work through innovative projects and initiatives, with a focus on refugee support and crisis response in Jordan.",
            meta_keywords: ["AI humanitarian work", "refugee support", "crisis response", "data analysis", "innovation", "humanitarian technology", "AI for good"],
            status: "published",
            published_at: new Date().toISOString()
          };

          await createBlogPost(fourthPost);
          console.log("Fourth blog post created successfully!");
        }
      } catch (error) {
        console.error("Error initializing blog:", error);
      }
    };

    initializeBlog();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ai-humanitarian-solutions" element={<AIHumanitarian />} />
            <Route path="/ai-humanitarian-training" element={<AIHumanitarianTraining />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;