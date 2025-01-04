import React from 'react';
import { Card } from "@/components/ui/card";
import { Users, Globe, Brain, Code } from 'lucide-react';
import { motion } from "framer-motion";

const ImpactMetrics = () => {
  const metrics = [
    {
      title: "People Impacted",
      value: "2M+",
      description: "Lives touched through digital solutions",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Global Reach",
      value: "15+",
      description: "Countries with active projects",
      icon: Globe,
      color: "text-green-500"
    },
    {
      title: "AI Solutions",
      value: "30+",
      description: "AI-powered humanitarian projects",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      title: "Digital Systems",
      value: "50+",
      description: "Digital transformation initiatives",
      icon: Code,
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Global Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
                <div className={`mx-auto w-12 h-12 rounded-full ${metric.color} bg-primary/5 flex items-center justify-center mb-4`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-primary">{metric.value}</h3>
                <h4 className="text-lg font-semibold mb-2 text-primary/80">{metric.title}</h4>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;