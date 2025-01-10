import { motion } from "framer-motion";

export const BlogHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Welcome to Our Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover insights, tutorials, and stories from our community
          </p>
        </motion.div>
      </div>
    </div>
  );
};