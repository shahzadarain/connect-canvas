import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Reading from "@/pages/Reading";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import AITools from "@/pages/AITools";
import AINews from "@/pages/AINews";
import AIHumanitarian from "@/pages/AIHumanitarian";
import AIHumanitarianTraining from "@/pages/AIHumanitarianTraining";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/ai-news" element={<AINews />} />
                <Route path="/ai-humanitarian" element={<AIHumanitarian />} />
                <Route
                  path="/reading"
                  element={
                    <ProtectedRoute>
                      <Reading />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-humanitarian/training"
                  element={<AIHumanitarianTraining />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;