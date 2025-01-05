import { motion } from "framer-motion";
import { ArrowRight, Brain, Code, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,51,122,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite] opacity-30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Icons */}
          <div className="flex justify-center gap-8 mb-8">
            {[Brain, Code, Globe].map((Icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm shadow-xl"
              >
                <Icon className="w-8 h-8 text-primary" />
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight"
          >
            Transforming Ideas into{" "}
            <span className="text-accent">Intelligent Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-primary/80 mb-12 leading-relaxed"
          >
            Explore the intersection of artificial intelligence and humanitarian
            technology. Discover how we're building solutions that make a
            difference.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-white"
            >
              <Link to="/ai-humanitarian">
                Explore AI Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-primary/20 hover:border-primary/40"
            >
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary/20 rounded-full p-1">
              <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce mx-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;