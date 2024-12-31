import React, { useState } from 'react';
import { Mail, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting to subscribe email:', email);
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        console.error('Error subscribing to newsletter:', error);
        throw error;
      }

      console.log('Successfully subscribed to newsletter');
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message === 'duplicate key value violates unique constraint "newsletter_subscribers_email_key"'
          ? "This email is already subscribed."
          : "There was a problem subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-2 bg-blue-50 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to receive insights about AI in humanitarian tech, project updates, and digital transformation strategies.
          </p>
          
          <Card className="p-6 md:p-8 bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-12 text-lg"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;