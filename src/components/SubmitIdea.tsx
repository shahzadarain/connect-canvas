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
      
      const { data, error } = await supabase
        .from('ideas')
        .insert([
          { 
            name, 
            email, 
            idea,
            approval_status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting idea:', error);
        throw error;
      }

      console.log('Idea submitted successfully:', data);
      
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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Innovative Idea
          </h2>
          <p className="text-lg text-gray-600">
            We'd love to hear your thoughts on using AI for social impact
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl rounded-2xl bg-white/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="h-14 px-6 text-lg bg-white rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="h-14 px-6 text-lg bg-white rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Textarea
                id="idea"
                value={formData.idea}
                onChange={handleChange}
                required
                placeholder="Share your idea here..."
                className="min-h-[150px] p-6 text-lg bg-white rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Share Idea'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default SubmitIdea;