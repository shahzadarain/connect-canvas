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
            content: `Artificial Intelligence (AI) has become a transformative force in addressing global challenges, from climate change to healthcare. However, as its adoption grows, so do the ethical concerns surrounding its use. Working with global organizations like the United Nations (UN) has provided valuable insights into these challenges and how they can be addressed. Here's what we've learned about ethical AI and its role in creating a fairer, more sustainable world.  

### **The Ethical Challenges of AI in Global Organizations**  

1. **Bias and Fairness**  
AI systems are only as good as the data they're trained on. If the data reflects historical biases or lacks diversity, the AI can perpetuate or even amplify these biases. For example, an AI used in hiring processes might favor certain demographics over others, leading to unfair outcomes. In global organizations like the UN, where inclusivity is a core value, biased AI can undermine efforts to promote equality.  

2. **Transparency and Accountability**  
Many AI systems operate as "black boxes," meaning their decision-making processes are not easily understood. This lack of transparency can erode trust, especially when AI is used in critical areas like disaster response or resource allocation. Without clear accountability, it's difficult to address errors or unintended consequences.  

3. **Privacy and Data Security**  
AI relies on vast amounts of data, often including sensitive personal information. In global organizations, where data is collected from diverse populations, ensuring privacy and security is paramount. Mismanagement of data can lead to breaches, misuse, or exploitation, particularly in vulnerable communities.  

4. **Digital Divide**  
While AI has the potential to drive progress, its benefits are not evenly distributed. Many developing countries lack the infrastructure, expertise, or resources to fully leverage AI. This digital divide can exacerbate existing inequalities, leaving some populations further behind.  

### **How These Challenges Can Be Addressed**  

1. **Promoting Inclusive and Diverse Data**  
To combat bias, AI systems must be trained on diverse and representative datasets. Global organizations like the UN can lead by example, ensuring that data collection processes are inclusive and that marginalized voices are heard. Regular audits of AI systems can also help identify and correct biases.  

2. **Ensuring Transparency and Explainability**  
AI developers must prioritize creating systems that are transparent and explainable. This means designing algorithms that can provide clear reasoning for their decisions. For global organizations, adopting open standards and sharing best practices can build trust and foster collaboration.  

3. **Strengthening Data Privacy Protections**  
Robust data governance frameworks are essential to protect privacy and security. The UN and other global organizations can advocate for international regulations that safeguard personal data while enabling innovation. Techniques like federated learning, where data remains on local devices, can also help minimize risks.  

4. **Bridging the Digital Divide**  
To ensure AI benefits everyone, global organizations must invest in capacity-building initiatives. This includes providing training, resources, and infrastructure to underserved regions. Partnerships between governments, private sectors, and NGOs can help create a more equitable AI ecosystem.  

5. **Establishing Ethical Guidelines and Oversight**  
The UN has already taken steps to address ethical AI through initiatives like the *Recommendation on the Ethics of Artificial Intelligence*. By setting global standards and establishing oversight mechanisms, organizations can ensure AI is used responsibly and aligned with human rights principles.  

### **The Path Forward**  
Ethical AI is not just a technical challenge—it's a moral imperative. As global organizations like the UN continue to integrate AI into their work, they must lead by example, demonstrating how technology can be harnessed for the greater good. By addressing ethical challenges head-on, we can create AI systems that are fair, transparent, and inclusive, ultimately advancing the UN's mission of peace, development, and human rights.  

What are your thoughts on the ethical use of AI in global organizations? How can we ensure AI serves humanity equitably? Share your ideas in the comments below!  

— Shahzad ASGHAR`,
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