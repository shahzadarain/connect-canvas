
import { motion } from "framer-motion";

export const BlogHero = () => {
  return (
    <div className="relative h-[280px] sm:h-[320px] bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-800 dark:via-purple-700 dark:to-indigo-800 overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] 
          bg-[length:24px_24px] text-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>
      
      {/* Content wrapper */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-center max-w-3xl"
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Insights & Ideas
          </motion.h1>
          <motion.p 
            className="text-md md:text-lg text-blue-50/90 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore our collection of articles, tutorials, and deep dives
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
    </div>
  );
};
