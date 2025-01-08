import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Mail, Send, CheckCircle, Loader2, MessageSquare, User } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-50" />
      
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-4 dark:bg-blue-900/30">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I would love to hear from you! Whether you have a question, feedback, or just want to connect, feel free to reach out.
          </p>
        </div>
        
        <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting || submitted}
                  className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  aria-label="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting || submitted}
                  className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  aria-label="Your email address"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                required
                disabled={isSubmitting || submitted}
                className="w-full min-h-[120px] bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                aria-label="Your message"
              />
            </div>
            
            <Button
              type="submit"
              className={`w-full h-12 ${
                submitted 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-all duration-200 text-white font-medium rounded-lg`}
              disabled={isSubmitting || submitted}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Sent Successfully
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;