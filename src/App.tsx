import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { initializeResources, addAllResources } from "@/utils/resourceUtils";
import { initializeBlogPosts } from "@/utils/blogUtils";
import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Reading from "./pages/Reading";
import AIHumanitarian from "./pages/AIHumanitarian";
import AIHumanitarianTraining from "./pages/AIHumanitarianTraining";
import AITools from "./pages/AITools";
import AINews from "./pages/AINews";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const session = useSession();

  useEffect(() => {
    const initialize = async () => {
      if (session) {
        console.log('Initializing with authenticated session...');
        try {
          await Promise.all([
            initializeResources(),
            initializeBlogPosts(),
            addAllResources()
          ]);
        } catch (error) {
          console.error('Error during initialization:', error);
        }
      } else {
        console.log('Skipping initialization - no authenticated session');
      }
    };

    initialize();
  }, [session]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/reading" element={
        <ProtectedRoute>
          <Reading />
        </ProtectedRoute>
      } />
      <Route path="/ai-humanitarian-solutions" element={<AIHumanitarian />} />
      <Route path="/ai-humanitarian-training" element={<AIHumanitarianTraining />} />
      <Route path="/ai-tools" element={<AITools />} />
      <Route path="/ai-news" element={<AINews />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;