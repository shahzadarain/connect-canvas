import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import NewsSection from "@/components/NewsSection";
import Contact from "@/components/Contact";
import SubmitIdea from "@/components/SubmitIdea";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main>
        <Hero />
        <div className="space-y-24 pb-20 px-4 sm:px-6 lg:px-8">
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ImpactMetrics />
          </motion.section>
          
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <NewsSection />
          </motion.section>
          
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SubmitIdea />
          </motion.section>
          
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Contact />
          </motion.section>
        </div>
      </main>
    </motion.div>
  );
};

export default Index;