import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import Contact from "@/components/Contact";
import SubmitIdea from "@/components/SubmitIdea";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

const Index = () => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Shahzad Asghar - Digital Innovation & AI Solutions</title>
        <meta name="description" content="Explore innovative digital solutions and AI-driven humanitarian projects by Shahzad Asghar. Two decades of experience in IT infrastructure, cloud services, and analytics." />
        <meta name="keywords" content="Digital Transformation, AI Innovation, Humanitarian Tech, Cloud Computing, Cybersecurity" />
        <meta property="og:title" content="Shahzad Asghar - Digital Innovation & AI Solutions" />
        <meta property="og:description" content="Innovative digital solutions and AI-driven humanitarian projects with two decades of experience." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <motion.div 
        className="min-h-screen bg-gradient-to-b from-background to-background/95"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        role="main"
        aria-label="Main content"
      >
        <main className="relative">
          <Hero />
          
          <div className={`space-y-${isMobile ? '12' : '20'} pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}>
            <motion.section
              variants={sectionVariants}
              className="relative z-10"
              role="region"
              aria-label="Impact metrics"
            >
              <ImpactMetrics />
            </motion.section>
            
            <motion.section
              variants={sectionVariants}
              className="relative z-10"
              role="region"
              aria-label="Submit your idea"
            >
              <SubmitIdea />
            </motion.section>
            
            <motion.section
              variants={sectionVariants}
              className="relative z-10"
              role="region"
              aria-label="Contact information"
            >
              <Contact />
            </motion.section>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background opacity-50" />
            <div 
              className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
              aria-hidden="true"
            />
          </div>
        </main>

        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>
      </motion.div>
    </>
  );
};

export default Index;