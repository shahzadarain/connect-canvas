import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Smartphone, Globe } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#1A1D24]">
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-[#1E2128]/50 backdrop-blur-sm">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Smartphone className="w-8 h-8 text-[#60A5FA]" />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl font-bold text-[#60A5FA]"
          >
            SHAHZAD ASGHAR
          </motion.h1>
          <Globe className="w-8 h-8 text-[#60A5FA]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-xl text-gray-300 mb-4">
            ✨ Innovation is my passion ✨
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            With two decades of experience, I've merged IT infrastructure, cloud services,
            AI, and analytics to support informed decisions and protect vulnerable
            communities. My work spans from integrating refugee data with national
            health systems to implementing AI-enabled communication solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {["#DigitalTransformation", "#HumanitarianTech", "#AIInnovation", "#CloudComputing", "#Cybersecurity"].map(
            (tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-[#2A2E37] text-[#60A5FA] text-sm"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            asChild
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8"
          >
            <Link to="/projects">View Profile →</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 px-8"
          >
            <Link to="/contact">Connect with Me →</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;