import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, GraduationCap, Star } from 'lucide-react';
import { courses } from "@/data/coursesData";

const LearningAchievements = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-primary/90 via-background to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 animate-fade-in">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Continuous Learning Journey
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Tracking my professional development through various courses and certifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ScrollArea className="h-[600px] rounded-xl border bg-card/50 backdrop-blur-sm shadow-xl">
            <div className="p-6">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {courses.map((category, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-primary/10 rounded-lg px-4 transition-all duration-200 hover:border-primary/20 data-[state=open]:bg-primary/5"
                  >
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary/70" />
                        <span>{category.category}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 py-2">
                        {category.items.map((course, courseIndex) => (
                          <div
                            key={courseIndex}
                            className="group bg-background/50 rounded-lg p-4 transition-all duration-300 hover:bg-background/80 hover:shadow-md"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {course.featured && (
                                    <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
                                  )}
                                  <h3 className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                                    {course.title}
                                  </h3>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p className="flex items-center gap-2">
                                    <span className="font-medium">{course.platform}</span>
                                    {course.instructor && (
                                      <>
                                        <span className="text-primary/30">•</span>
                                        <span>{course.instructor}</span>
                                      </>
                                    )}
                                  </p>
                                  {course.description && (
                                    <p className="mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      {course.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Badge 
                                variant="secondary"
                                className="bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 transition-colors duration-200"
                              >
                                {course.completed}
                              </Badge>
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
