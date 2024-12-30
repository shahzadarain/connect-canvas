import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { courses } from "@/data/coursesData";

const LearningAchievements = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Continuous Learning Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              {courses.map((category, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {category.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {category.items.map((course, courseIndex) => (
                        <div
                          key={courseIndex}
                          className="bg-card rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{course.title}</h3>
                            <Badge variant="secondary">{course.completed}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {course.platform}{course.instructor ? ` | ${course.instructor}` : ''}
                            </p>
                            {course.description && (
                              <p className="mt-1">{course.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default LearningAchievements;