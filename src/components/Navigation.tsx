import React from 'react';
import { Card } from "./ui/card";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">AI & Data Expert</div>
          <div className="flex gap-8">
            <a href="#projects" className="text-primary hover:text-accent transition-colors">Projects</a>
            <a href="#impact" className="text-primary hover:text-accent transition-colors">Global Impact</a>
            <a href="#certificates" className="text-primary hover:text-accent transition-colors">Certificates</a>
            <a href="#submit" className="text-primary hover:text-accent transition-colors">Submit Idea</a>
            <a href="#connect" className="text-primary hover:text-accent transition-colors">Connect</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;