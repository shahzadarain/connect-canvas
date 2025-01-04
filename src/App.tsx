import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
      console.log("Checking if we need to create the first blog post...");
      
      try {
        // Check if the post already exists
        const { data: existingPosts } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', 'ai-transforming-global-development-un-experience')
          .single();

        if (!existingPosts) {
          console.log("Creating first blog post...");
          const firstPost = {
            title: "How AI is Transforming Global Development: Insights from My UN Experience",
            slug: "ai-transforming-global-development-un-experience",
            content: `Artificial intelligence (AI) is no longer a futuristic concept confined to science fiction. It's a powerful tool reshaping our world, and its impact on global development is particularly profound. My experience working with the United Nations has given me a front-row seat to this transformation, witnessing firsthand how AI is being harnessed to address some of the world's most pressing challenges.

From predicting and mitigating the effects of climate change to alleviating poverty and improving healthcare outcomes, AI is proving to be a game-changer. Here are a few examples of how AI is being used in UN projects:

**Poverty Alleviation:** AI is being used to identify and target vulnerable populations, enabling more efficient and effective delivery of aid and social services. For example, AI-powered systems can analyze satellite imagery to identify areas with high poverty rates, helping organizations direct resources where they are most needed.

**Climate Change:** AI is playing a crucial role in monitoring and predicting the effects of climate change. AI algorithms can analyze vast amounts of climate data to identify trends, predict extreme weather events, and support the development of mitigation strategies. This information is vital for vulnerable communities to adapt to the changing climate and build resilience.

**Healthcare:** AI is revolutionizing healthcare delivery, particularly in underserved communities. AI-powered diagnostic tools can analyze medical images and patient data to detect diseases at an early stage, enabling timely intervention and improving treatment outcomes. In remote areas with limited access to healthcare professionals, AI can provide vital support for diagnosis and treatment.

**Personal Anecdote:** I recall working on a project in rural Africa where access to healthcare was limited. We implemented an AI-powered diagnostic tool that could analyze medical images and provide preliminary diagnoses. This tool proved invaluable in identifying cases that required urgent attention, enabling timely referrals and potentially saving lives. It was incredibly rewarding to see how AI could bridge the healthcare gap and make a tangible difference in people's lives.

**The Future of AI in Global Development:**

The potential of AI to transform global development is immense. As AI technology continues to evolve, we can expect even more innovative applications that will further accelerate progress towards the Sustainable Development Goals. However, it's crucial to ensure that AI is developed and deployed responsibly and ethically, addressing potential risks such as bias and job displacement.

The UN is actively engaged in shaping global AI governance, promoting ethical guidelines, and fostering collaboration to harness AI's potential for good. By working together, we can ensure that AI is used to create a more equitable, sustainable, and prosperous future for all.`,
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
        } else {
          console.log("First blog post already exists, skipping creation.");
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