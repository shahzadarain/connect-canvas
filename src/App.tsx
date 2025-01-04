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
            content: `The United Nations Sustainable Development Goals (SDGs) are a universal call to action to end poverty, protect the planet, and ensure prosperity for all by 2030. While these goals are ambitious, emerging technologies like Artificial Intelligence (AI) are proving to be powerful tools in accelerating progress. Let's break down a few specific SDGs and explore how AI can contribute to achieving them.

1. SDG 2: Zero Hunger
AI can revolutionize agriculture by optimizing crop yields, predicting weather patterns, and detecting diseases in plants. For instance, AI-powered drones and sensors can monitor soil health and water usage, enabling farmers to make data-driven decisions. This not only increases food production but also reduces waste, helping to combat hunger globally.

2. SDG 3: Good Health and Well-Being
AI is transforming healthcare by enabling early diagnosis, personalized treatment, and efficient resource management. Machine learning algorithms can analyze medical data to detect diseases like cancer at earlier stages, while AI-driven telemedicine platforms bring healthcare to remote areas. These advancements are critical in improving global health outcomes.

3. SDG 7: Affordable and Clean Energy
AI can optimize energy consumption and integrate renewable energy sources into power grids. Smart grids, powered by AI, can balance supply and demand, reduce energy waste, and lower costs. Additionally, AI can improve the efficiency of solar and wind energy systems, making clean energy more accessible and affordable.

4. SDG 13: Climate Action
Climate change is one of the most pressing challenges of our time, and AI can play a key role in addressing it. AI models can predict extreme weather events, track deforestation, and monitor carbon emissions. These insights enable governments and organizations to take proactive measures to mitigate climate risks and protect vulnerable communities.

5. SDG 4: Quality Education
AI-powered tools like personalized learning platforms and virtual tutors are making education more accessible and inclusive. These technologies adapt to individual learning styles, helping students grasp complex concepts at their own pace. AI can also bridge the gap in education by providing resources to underserved communities, ensuring no one is left behind.

6. SDG 9: Industry, Innovation, and Infrastructure
AI drives innovation by enhancing productivity and efficiency across industries. From predictive maintenance in manufacturing to optimizing supply chains, AI is reshaping how businesses operate. By fostering innovation, AI contributes to building resilient infrastructure and promoting sustainable industrialization.

The Road Ahead
While AI holds immense potential, it's important to address challenges like data privacy, ethical concerns, and the digital divide. Collaboration between governments, businesses, and communities is essential to ensure AI is used responsibly and equitably.

By harnessing the power of AI, we can make significant strides toward achieving the SDGs and creating a better, more sustainable future for all. Let's embrace this technology as a force for good and work together to turn these global goals into reality.

What are your thoughts on the role of AI in achieving the SDGs? Share your insights in the comments below!

— Shahzad Asghar`,
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
        } else {
          console.log("Second blog post already exists, skipping creation.");
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