import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import NewsSection from "@/components/NewsSection";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="space-y-20 pb-20">
        <ImpactMetrics />
        <NewsSection />
        <Contact />
      </div>
    </div>
  );
};

export default Index;