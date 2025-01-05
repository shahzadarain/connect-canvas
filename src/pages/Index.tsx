import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ImpactMetrics from "@/components/ImpactMetrics";
import Contact from "@/components/Contact";
import ApprovedIdeas from "@/components/ApprovedIdeas";
import SubmitIdea from "@/components/SubmitIdea";
import WorldMap from "@/components/WorldMap";

const Index = () => {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Projects />
      <ImpactMetrics />
      <WorldMap />
      <ApprovedIdeas />
      <SubmitIdea />
      <Contact />
    </div>
  );
};

export default Index;