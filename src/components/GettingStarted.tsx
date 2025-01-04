import React from 'react';
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Globe, Users } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const GettingStarted = () => {
  const guides = [
    {
      title: "AI Humanitarian Solutions",
      description: "Explore how we're using AI to solve humanitarian challenges",
      icon: Brain,
      link: "/ai-humanitarian-solutions",
      color: "text-purple-500"
    },
    {
      title: "Training Programs",
      description: "Access our comprehensive AI training resources",
      icon: BookOpen,
      link: "/ai-humanitarian-training",
      color: "text-blue-500"
    },
    {
      title: "Global Impact",
      description: "See how our solutions are making a difference worldwide",
      icon: Globe,
      link: "#impact",
      color: "text-green-500"
    },
    {
      title: "Join Our Community",
      description: "Connect with others passionate about humanitarian tech",
      icon: Users,
      link: "#submit",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background/80 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Getting Started</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Begin your journey into AI-powered humanitarian solutions. Choose a path below to learn more about our initiatives and how you can get involved.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={guide.link}>
                <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10 cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-lg ${guide.color} bg-primary/5 mb-4`}>
                      <guide.icon className={`w-6 h-6 ${guide.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {guide.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;