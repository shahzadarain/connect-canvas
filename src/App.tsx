import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import AITools from "./pages/AITools";
import AINews from "./pages/AINews";
import AIHumanitarian from "./pages/AIHumanitarian";
import AIHumanitarianTraining from "./pages/AIHumanitarianTraining";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Reading from "./pages/Reading";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { Helmet } from "react-helmet";
import { personSchema, organizationSchema, faqSchema } from "./schema/schema";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(personSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
        <Navigation />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/ai-news" element={<AINews />} />
            <Route path="/ai-humanitarian" element={<AIHumanitarian />} />
            <Route path="/ai-humanitarian-training" element={<AIHumanitarianTraining />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;