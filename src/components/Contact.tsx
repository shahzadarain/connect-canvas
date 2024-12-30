import React from 'react';
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Card } from "./ui/card";

const Contact = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Let's Connect
          </h2>
          <Card className="p-8 bg-white/10 backdrop-blur-sm">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-white hover:text-accent transition-colors text-lg"
            >
              <LinkedInLogoIcon className="w-8 h-8" />
              <span>Connect on LinkedIn</span>
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;