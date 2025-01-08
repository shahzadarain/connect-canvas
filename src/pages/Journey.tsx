import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import WorldMap from "@/components/WorldMap";

const Journey = () => {
  return (
    <>
      <Helmet>
        <title>Global Journey - Professional Experience & Missions</title>
        <meta 
          name="description" 
          content="Explore my professional journey across continents, from Pakistan to Switzerland, showcasing humanitarian and technological contributions worldwide." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Global Journey
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Two decades of humanitarian technology leadership across continents,
              from national health programs to AI-driven refugee solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <WorldMap />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Journey;