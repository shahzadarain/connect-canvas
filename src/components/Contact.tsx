import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Loader2, Send, CheckCircle } from "lucide-react";

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
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-8 text-gray-600">
            I would love to hear from you! Whether you have a question, feedback, or just want to connect, feel free to reach out.
          </p>
        </div>
        
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={isSubmitting || submitted}
                className="w-full"
                aria-label="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isSubmitting || submitted}
                className="w-full"
                aria-label="Your email address"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                required
                disabled={isSubmitting || submitted}
                className="w-full min-h-[120px]"
                aria-label="Your message"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full h-12"
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