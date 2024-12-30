import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Submit Your Idea
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="ideaName" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <Input
                id="ideaName"
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="ideaEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                id="ideaEmail"
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Your Idea
              </label>
              <Textarea
                id="ideaDescription"
                required
                rows={6}
                placeholder="Describe your idea in detail..."
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Idea
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubmitIdea;