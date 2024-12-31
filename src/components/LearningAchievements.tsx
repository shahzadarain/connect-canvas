import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap, BookOpen, Star, Calendar, User } from 'lucide-react';
import { courses } from "@/data/coursesData";

const LearningAchievements = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#1A1F2C] via-[#221F26] to-[#1A1F2C]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-3 bg-blue-500/10 rounded-2xl mb-6">
            <GraduationCap className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Continuous Learning Journey
          </h2>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
            A comprehensive collection of professional certifications and learning achievements
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <ScrollArea className="h-[600px] rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
            <div className="p-6">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {courses.map((category, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-white/10 rounded-xl px-4 transition-all duration-300 hover:border-white/20 data-[state=open]:bg-white/[0.02] backdrop-blur-sm"
                  >
                    <AccordionTrigger className="py-6 hover:no-underline group">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                          <BookOpen className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
                          {category.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 py-2">
                        {category.items.map((course, courseIndex) => (
                          <div
                            key={courseIndex}
                            className="group bg-white/[0.02] hover:bg-white/[0.04] rounded-xl p-5 transition-all duration-300 border border-white/5 hover:border-white/10"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start gap-2">
                                  {course.featured && (
                                    <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
                                  )}
                                  <h3 className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors">
                                    {course.title}
                                  </h3>
                                </div>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-blue-200/70">
                                  <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    <span>{course.platform}</span>
                                    {course.instructor && (
                                      <>
                                        <span className="text-white/20 mx-2">•</span>
                                        <span>{course.instructor}</span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {course.description && (
                                  <p className="text-sm text-blue-100/60 leading-relaxed">
                                    {course.description}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-sm text-blue-200/70">
                                  <Calendar className="w-4 h-4" />
                                  <span>{course.completed}</span>
                                </div>
                                <Badge 
                                  variant="secondary"
                                  className="bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 transition-all duration-300 whitespace-nowrap"
                                >
                                  Completed
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default LearningAchievements;