import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Smartphone, Globe } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log("Hero component loading state:", isLoading);

  if (isLoading) {
    return (
      <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#1A1D24] to-[#2A2E37]">
        <div className="max-w-5xl mx-auto p-10 rounded-3xl bg-[#1E2128]/50 backdrop-blur-sm border border-gray-800/50">
          <div className="flex justify-center items-center gap-6 mb-6">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-14 w-72" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <div className="text-center mb-10 space-y-6">
            <Skeleton className="h-8 w-56 mx-auto" />
            <Skeleton className="h-32 w-full max-w-2xl mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-10 w-36 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#1A1D24] to-[#2A2E37]"
      aria-label="Introduction"
    >
      <motion.div 
        className="max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#1E2128]/50 backdrop-blur-sm border border-gray-800/50 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-[#60A5FA]" aria-hidden="true" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#818CF8] bg-clip-text text-transparent"
          >
            SHAHZAD ASGHAR
          </motion.h1>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#60A5FA]" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#60A5FA] mb-6 tracking-wide">
            ✨ Innovation is my passion ✨
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            With two decades of experience, I've merged IT infrastructure, cloud services,
            AI, and analytics to support informed decisions and protect vulnerable
            communities. My work spans from integrating refugee data with national
            health systems to implementing AI-enabled communication solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {["#DigitalTransformation", "#HumanitarianTech", "#AIInnovation", "#CloudComputing", "#Cybersecurity"].map(
            (tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#2A2E37] text-[#60A5FA] text-base sm:text-lg font-medium border border-[#60A5FA]/20 hover:border-[#60A5FA]/50 transition-colors"
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Button
            asChild
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View Shahzad's LinkedIn Profile"
            >
              View Profile →
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Connect with Shahzad on LinkedIn"
            >
              Connect with Me →
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;