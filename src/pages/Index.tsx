import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import NewsSection from "@/components/NewsSection";
import Contact from "@/components/Contact";
import SubmitIdea from "@/components/SubmitIdea";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="space-y-20 pb-20">
        <ImpactMetrics />
        <NewsSection />
        <SubmitIdea />
        <Contact />
      </div>
    </div>
  );
};

export default Index;