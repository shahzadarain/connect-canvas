import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WorldMap from "@/components/WorldMap";
import SubmitIdea from "@/components/SubmitIdea";
import ApprovedIdeas from "@/components/ApprovedIdeas";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import LearningAchievements from "@/components/LearningAchievements";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
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