import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface IdeaSubmission {
  name: string;
  email: string;
  idea: string;
}

const SubmitIdea = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<IdeaSubmission>({
    name: '',
    email: '',
    idea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    console.log('Form data updated:', { [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { name, email, idea } = formData;
      console.log('Submitting idea to Supabase:', { name, email, idea });
      
      const { error } = await supabase
        .from('ideas')
        .insert([{ name, email, idea }]);

      if (error) {
        console.error('Error submitting idea:', error);
        throw error;
      }

      console.log('Idea submitted successfully');
      
      setFormData({ name: '', email: '', idea: '' });
      
      toast({
        title: "Success!",
        description: "Thank you for sharing your idea. We'll review it soon!",
      });
    } catch (error) {
      console.error('Error in submission:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit" className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-6 animate-fade-in">
            Submit Your Innovative Idea
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12 animate-fade-in">
            Share your ideas for AI and data-driven solutions in the humanitarian sector
          </p>
          <Card className="p-8 shadow-lg backdrop-blur-sm bg-card/50 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-lg font-medium text-primary">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="text-lg transition-all duration-300 focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg font-medium text-primary">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="text-lg transition-all duration-300 focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="idea" className="block text-lg font-medium text-primary">
                  Your Idea
                </label>
                <Textarea
                  id="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe your idea for using AI and data in humanitarian projects..."
                  className="text-lg resize-none transition-all duration-300 focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full text-lg py-6 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent transition-all duration-300 transform hover:scale-[1.02]" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Idea'
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SubmitIdea;