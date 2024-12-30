import React from 'react';
import Hero from '@/components/Hero';
import WorldMap from '@/components/WorldMap';
import Projects from '@/components/Projects';
import ReadingList from '@/components/ReadingList';
import Certificates from '@/components/Certificates';
import SubmitIdea from '@/components/SubmitIdea';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WorldMap />
      <Projects />
      <ReadingList />
      <Certificates />
      <SubmitIdea />
      <Contact />
    </div>
  );
};

export default Index;