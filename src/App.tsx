
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
import BlogEditor from "@/pages/BlogEditor";
import AITools from "@/pages/AITools";
import AINews from "@/pages/AINews";
import AIHumanitarian from "@/pages/AIHumanitarian";
import AIHumanitarianTraining from "@/pages/AIHumanitarianTraining";
import Projects from "@/pages/Projects";
import IdeasList from "@/pages/IdeasList";
import Journey from "@/pages/Journey";
import Learning from "@/pages/Learning";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookDiscussions from "@/pages/BookDiscussions";
import UNJobs from "@/pages/UNJobs";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import DagDashboard from "@/pages/DagDashboard";

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
            <VisitorTracker />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route
                  path="/blog/editor"
                  element={
                    <ProtectedRoute>
                      <BlogEditor />
                    </ProtectedRoute>
                  }
                />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/ai-news" element={<AINews />} />
                <Route path="/ai-humanitarian" element={<AIHumanitarian />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/ideas" element={<IdeasList />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/un-jobs" element={<UNJobs />} />
                <Route
                  path="/reading"
                  element={
                    <ProtectedRoute>
                      <Reading />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book-discussions"
                  element={
                    <ProtectedRoute>
                      <BookDiscussions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-humanitarian/training"
                  element={<AIHumanitarianTraining />}
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <AnalyticsDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/dashboards" element={<DagDashboard />} />
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
