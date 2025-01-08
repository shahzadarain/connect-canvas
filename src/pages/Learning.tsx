import { motion } from "framer-motion";
import LearningAchievements from "@/components/LearningAchievements";

const Learning = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background"
    >
      <LearningAchievements />
    </motion.div>
  );
};

export default Learning;