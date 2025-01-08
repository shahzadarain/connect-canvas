import { motion } from "framer-motion";

export const BackgroundText = () => {
  return (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
      <div className="text-[20rem] font-bold bg-gradient-to-b from-[#0FA0CE] to-[#0047AB] bg-clip-text text-transparent">
        SA
      </div>
    </div>
  );
};