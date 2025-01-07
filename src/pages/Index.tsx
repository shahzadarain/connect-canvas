import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import NewsSection from "@/components/NewsSection";
import Contact from "@/components/Contact";
import SubmitIdea from "@/components/SubmitIdea";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <main className="relative">
        <Hero />
        <div className={`space-y-${isMobile ? '16' : '24'} pb-20 px-4 sm:px-6 lg:px-8`}>
          <motion.section
            variants={sectionVariants}
            className="relative z-10"
          >
            <ImpactMetrics />
          </motion.section>
          
          <motion.section
            variants={sectionVariants}
            className="relative z-10"
          >
            <NewsSection />
          </motion.section>
          
          <motion.section
            variants={sectionVariants}
            className="relative z-10"
          >
            <SubmitIdea />
          </motion.section>
          
          <motion.section
            variants={sectionVariants}
            className="relative z-10"
          >
            <Contact />
          </motion.section>
        </div>

        {/* Background gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background opacity-50" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
      </main>
    </motion.div>
  );
};

export default Index;