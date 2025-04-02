import React, { useState } from 'react';
import BlogEditor from '@/components/blog/editor/BlogEditor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createAISafeguardingPost } from '@/utils/blog/addAISafeguardingPost';
import { updatePovertyMappingPost } from '@/utils/blog/updatePovertyMappingPost';
import { updateAIIndustryPost } from '@/utils/blog/updateAIIndustryPost';
import { createMCPPost } from '@/utils/blog/addMCPPost';

const BlogEditorPage = () => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingIndustry, setIsUpdatingIndustry] = useState(false);
  const [isAddingMCP, setIsAddingMCP] = useState(false);

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

  const handleUpdatePovertyMappingPost = async () => {
    setIsUpdating(true);
    try {
      await updatePovertyMappingPost();
      toast({
        title: "Success",
        description: "Poverty Mapping blog post SEO updated successfully",
      });
    } catch (error) {
      console.error('Error updating Poverty Mapping post:', error);
      toast({
        title: "Error",
        description: "Failed to update Poverty Mapping blog post",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateAIIndustryPost = async () => {
    setIsUpdatingIndustry(true);
    try {
      await updateAIIndustryPost();
      toast({
        title: "Success",
        description: "AI Industry blog post updated successfully",
      });
    } catch (error) {
      console.error('Error updating AI Industry post:', error);
      toast({
        title: "Error",
        description: "Failed to update AI Industry blog post",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingIndustry(false);
    }
  };

  const handleAddMCPPost = async () => {
    setIsAddingMCP(true);
    try {
      await createMCPPost();
      toast({
        title: "Success",
        description: "Model Context Protocol blog post added successfully",
      });
    } catch (error) {
      console.error('Error adding MCP post:', error);
      toast({
        title: "Error",
        description: "Failed to add Model Context Protocol blog post",
        variant: "destructive",
      });
    } finally {
      setIsAddingMCP(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <Button 
            onClick={handleAddAISafeguardingPost} 
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add AI Safeguarding Article'}
          </Button>
          
          <Button 
            onClick={handleUpdatePovertyMappingPost} 
            disabled={isUpdating}
            variant="outline"
          >
            {isUpdating ? 'Updating...' : 'Update Poverty Mapping SEO'}
          </Button>

          <Button 
            onClick={handleUpdateAIIndustryPost} 
            disabled={isUpdatingIndustry}
            variant="secondary"
          >
            {isUpdatingIndustry ? 'Updating...' : 'Improve AI Industry Blog Format'}
          </Button>

          <Button 
            onClick={handleAddMCPPost} 
            disabled={isAddingMCP}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isAddingMCP ? 'Adding...' : 'Add MCP Blog Post'}
          </Button>
        </div>
      </div>
      <BlogEditor />
    </div>
  );
};

export default BlogEditorPage;
