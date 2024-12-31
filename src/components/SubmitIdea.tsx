import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles } from "lucide-react";

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
    <section id="submit" className="py-24 bg-gradient-to-b from-[#F2FCE2] to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-[#E5DEFF] rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mb-4 tracking-tight">
              Submit Your Innovative Idea
            </h2>
            <p className="text-lg text-[#403E43] md:text-xl max-w-2xl mx-auto">
              Share your ideas for AI and data-driven solutions in the humanitarian sector
            </p>
          </div>
          
          <Card className="p-8 md:p-10 shadow-xl backdrop-blur-sm bg-white/95 rounded-2xl border border-[#E5DEFF]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-lg font-medium text-[#1A1F2C]">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="text-lg h-12 transition-all duration-300 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg font-medium text-[#1A1F2C]">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="text-lg h-12 transition-all duration-300 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="idea" className="block text-lg font-medium text-[#1A1F2C]">
                  Your Idea
                </label>
                <Textarea
                  id="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe your idea for using AI and data in humanitarian projects..."
                  className="text-lg resize-none transition-all duration-300 border-[#E5DEFF] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-lg py-6 bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] hover:from-[#9b87f5] hover:to-[#8B5CF6] text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed h-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Share Your Idea'
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