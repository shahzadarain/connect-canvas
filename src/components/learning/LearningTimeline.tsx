import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, ExternalLink } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image_url?: string;
  alt_text?: string;
  link?: string;
}

interface LearningTimelineProps {
  achievements: Achievement[];
}

const LearningTimeline: React.FC<LearningTimelineProps> = ({ achievements }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="p-6 relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary/30" />
      
      <div className="space-y-12">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${index % 2 === 0 ? 'ml-1/2 pl-8' : 'mr-1/2 pr-8 text-right'}`}
          >
            {/* Timeline Node */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  onClick={() => setExpandedId(expandedId === achievement.id ? null : achievement.id)}
                  className={`absolute ${index % 2 === 0 ? 'left-0' : 'right-0'} top-0 transform -translate-x-1/2 w-8 h-8 rounded-full 
                    bg-secondary hover:bg-secondary-dark transition-colors duration-200 cursor-pointer
                    flex items-center justify-center group`}
                >
                  <Award className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent 
                className="w-80 bg-card/95 backdrop-blur-sm border-secondary/20"
                side={index % 2 === 0 ? "right" : "left"}
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{achievement.issuer}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{achievement.date}</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            {/* Achievement Card */}
            <AnimatePresence>
              <motion.div
                initial={false}
                animate={{ height: expandedId === achievement.id ? "auto" : "100px" }}
                className="bg-card/95 backdrop-blur-sm rounded-xl p-6 border border-secondary/20 
                  hover:border-secondary/40 transition-colors duration-200 overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{achievement.title}</h3>
                    {achievement.link && (
                      <a 
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary-dark transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="outline" className="bg-secondary/10">
                      {achievement.issuer}
                    </Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>

                  {expandedId === achievement.id && achievement.image_url && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <img
                        src={achievement.image_url}
                        alt={achievement.alt_text || achievement.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningTimeline;