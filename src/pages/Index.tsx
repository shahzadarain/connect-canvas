import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import Projects from "@/components/Projects";
import WorldMap from "@/components/WorldMap";
import LearningAchievements from "@/components/LearningAchievements";
import ApprovedIdeas from "@/components/ApprovedIdeas";
import SubmitIdea from "@/components/SubmitIdea";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ImpactMetrics />
      <Projects />
      <WorldMap />
      <LearningAchievements />
      <ApprovedIdeas />
      <SubmitIdea />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;