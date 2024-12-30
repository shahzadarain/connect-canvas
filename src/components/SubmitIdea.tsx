import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

interface IdeaSubmission {
  name: string;
  email: string;
  idea: string;
  timestamp: string;
}

const SubmitIdea = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('idea', '')]: value
    }));
    console.log('Form data updated:', { [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const submission: IdeaSubmission = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    // Get existing submissions or initialize empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('ideaSubmissions') || '[]');
    
    // Add new submission
    const updatedSubmissions = [...existingSubmissions, submission];
    
    // Save to localStorage
    localStorage.setItem('ideaSubmissions', JSON.stringify(updatedSubmissions));
    
    console.log('Idea submitted:', submission);
    console.log('All submissions:', updatedSubmissions);

    // Reset form
    setFormData({ name: '', email: '', idea: '' });

    toast({
      title: "Idea submitted!",
      description: "Thank you for sharing your idea. It has been saved successfully.",
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
                <label htmlFor="name" className="block text-lg font-medium text-primary mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="text-lg"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-primary mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="text-lg"
                />
              </div>
              <div>
                <label htmlFor="idea" className="block text-lg font-medium text-primary mb-2">
                  Your Idea
                </label>
                <Textarea
                  id="idea"
                  value={formData.idea}
                  onChange={handleChange}
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