import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap, BookOpen, Star, Calendar, User, Award } from 'lucide-react';
import { courses } from "@/data/coursesData";

const LearningAchievements = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A2F3C] to-[#1A1F2C]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(155,135,245,0.15)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite] opacity-30" />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-block p-4 bg-[#9b87f5]/20 rounded-2xl mb-8 backdrop-blur-sm">
              <Award className="w-16 h-16 text-[#9b87f5]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Learning Journey
            </h1>
            <p className="text-xl text-[#9b87f5]/90 leading-relaxed">
              Explore my continuous learning path through professional certifications and achievements
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A1F2C] to-transparent" />
      </div>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollArea className="h-[600px] rounded-2xl border border-[#9b87f5]/30 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
              <div className="p-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {courses.map((category, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="group border border-[#9b87f5]/30 rounded-xl px-4 transition-all duration-300 hover:border-[#9b87f5]/50 data-[state=open]:bg-[#9b87f5]/[0.15] backdrop-blur-sm"
                    >
                      <AccordionTrigger className="py-6 hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-lg bg-[#9b87f5]/20 group-hover:bg-[#9b87f5]/30 transition-colors duration-300">
                            <BookOpen className="w-5 h-5 text-[#9b87f5]" />
                          </div>
                          <span className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors duration-300">
                            {category.category}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 py-2">
                          {category.items.map((course, courseIndex) => (
                            <div
                              key={courseIndex}
                              className="group bg-[#9b87f5]/[0.08] hover:bg-[#9b87f5]/[0.15] rounded-xl p-5 transition-all duration-300 border border-[#9b87f5]/20 hover:border-[#9b87f5]/40"
                            >
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-start gap-2">
                                    {course.featured && (
                                      <Star className="w-5 h-5 text-yellow-400 shrink-0 mt-1 animate-pulse" />
                                    )}
                                    <h3 className="text-lg font-medium text-white group-hover:text-[#9b87f5] transition-colors">
                                      {course.title}
                                    </h3>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-4 text-sm text-[#9b87f5]/80">
                                    <div className="flex items-center gap-1.5">
                                      <User className="w-4 h-4" />
                                      <span>{course.platform}</span>
                                      {course.instructor && (
                                        <>
                                          <span className="text-[#9b87f5]/40 mx-2">•</span>
                                          <span>{course.instructor}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  {course.description && (
                                    <p className="text-sm text-[#9b87f5]/70 leading-relaxed">
                                      {course.description}
                                    </p>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5 text-sm text-[#9b87f5]/80">
                                    <Calendar className="w-4 h-4" />
                                    <span>{course.completed}</span>
                                  </div>
                                  <Badge 
                                    variant="secondary"
                                    className="bg-[#9b87f5]/20 text-white hover:bg-[#9b87f5]/30 transition-all duration-300 whitespace-nowrap"
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
    </div>
  );
};

export default LearningAchievements;