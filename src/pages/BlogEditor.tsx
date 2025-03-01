
import React, { useState } from 'react';
import BlogEditor from '@/components/blog/editor/BlogEditor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createAISafeguardingPost } from '@/utils/blog/addAISafeguardingPost';

const BlogEditorPage = () => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAISafeguardingPost = async () => {
    setIsAdding(true);
    try {
      await createAISafeguardingPost();
      toast({
        title: "Success",
        description: "AI Safeguarding blog post added successfully",
      });
    } catch (error) {
      console.error('Error adding AI Safeguarding post:', error);
      toast({
        title: "Error",
        description: "Failed to add AI Safeguarding blog post",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <Button 
          onClick={handleAddAISafeguardingPost} 
          disabled={isAdding}
          className="mb-4"
        >
          {isAdding ? 'Adding...' : 'Add AI Safeguarding Article'}
        </Button>
      </div>
      <BlogEditor />
    </div>
  );
};

export default BlogEditorPage;
