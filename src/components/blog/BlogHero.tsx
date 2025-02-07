
import { motion } from "framer-motion";

export const BlogHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-800 dark:via-blue-700 dark:to-indigo-800">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)] opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      
      <div className="relative container mx-auto px-4 py-28 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Insights & Ideas
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-50 max-w-2xl mx-auto">
            Explore our collection of articles, tutorials, and deep dives into technology, development, and more
          </p>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400" />
    </div>
  );
};
