import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

const SubmitIdea = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Idea submitted!",
      description: "Thank you for sharing your idea. I'll review it soon.",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-6">
            Submit Your Innovative Idea
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Share your ideas for AI and data-driven solutions in the humanitarian sector
          </p>
          <Card className="p-8 shadow-lg backdrop-blur-sm bg-card/50">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="ideaName" className="block text-lg font-medium text-primary mb-2">
                  Your Name
                </label>
                <Input
                  id="ideaName"
                  required
                  placeholder="Enter your name"
                  className="text-lg"
                />
              </div>
              <div>
                <label htmlFor="ideaEmail" className="block text-lg font-medium text-primary mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="ideaEmail"
                  required
                  placeholder="your@email.com"
                  className="text-lg"
                />
              </div>
              <div>
                <label htmlFor="ideaDescription" className="block text-lg font-medium text-primary mb-2">
                  Your Idea
                </label>
                <Textarea
                  id="ideaDescription"
                  required
                  rows={6}
                  placeholder="Describe your idea for using AI and data in humanitarian projects..."
                  className="text-lg resize-none"
                />
              </div>
              <Button type="submit" className="w-full text-lg py-6" size="lg">
                Submit Idea
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SubmitIdea;