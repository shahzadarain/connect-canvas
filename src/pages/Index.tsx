import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WorldMap from "@/components/WorldMap";
import SubmitIdea from "@/components/SubmitIdea";
import Contact from "@/components/Contact";
import ReadingList from "@/components/ReadingList";
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
      <ReadingList />
      <SubmitIdea />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;