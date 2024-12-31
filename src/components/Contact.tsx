import React from 'react';
import { LinkedInLogoIcon, EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Card } from "./ui/card";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary/90">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 animate-fade-in">
            Let's Connect
          </h2>
          <div className="grid gap-4">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <a
                href="https://www.linkedin.com/in/shahzadasghar1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 text-white hover:text-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LinkedInLogoIcon className="w-6 h-6" />
                  <span className="text-lg">Connect on LinkedIn</span>
                </div>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <a
                href="mailto:contact@example.com"
                className="flex items-center justify-between gap-3 text-white hover:text-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <EnvelopeClosedIcon className="w-6 h-6" />
                  <span className="text-lg">Send an Email</span>
                </div>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 text-white hover:text-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <GitHubLogoIcon className="w-6 h-6" />
                  <span className="text-lg">Follow on GitHub</span>
                </div>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;