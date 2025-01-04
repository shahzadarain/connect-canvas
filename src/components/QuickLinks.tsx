import React from 'react';
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Globe, Lightbulb, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const links = [
    {
      title: "AI Solutions",
      description: "Explore innovative AI solutions for humanitarian work",
      icon: Brain,
      href: "/ai-humanitarian-solutions",
      color: "text-purple-500"
    },
    {
      title: "Global Impact",
      description: "See our worldwide humanitarian technology initiatives",
      icon: Globe,
      href: "#impact",
      color: "text-blue-500"
    },
    {
      title: "Learning Resources",
      description: "Access training materials and documentation",
      icon: BookOpen,
      href: "#learning",
      color: "text-green-500"
    },
    {
      title: "Submit Ideas",
      description: "Share your innovative solutions",
      icon: Lightbulb,
      href: "#submit",
      color: "text-yellow-500"
    },
    {
      title: "Community",
      description: "Join our growing community of innovators",
      icon: Users,
      href: "#submit",
      color: "text-red-500"
    },
    {
      title: "Latest Projects",
      description: "Discover our recent technological initiatives",
      icon: Rocket,
      href: "#projects",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background/80 to-background">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Quick Access Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="block group"
            >
              <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${link.color} bg-primary/5 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className={`w-6 h-6 ${link.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary/80">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;