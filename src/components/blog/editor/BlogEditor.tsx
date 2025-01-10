import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title,
          content,
          slug,
          status: 'draft',
          author: 'Admin',
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post saved as draft",
      });

      navigate('/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-6">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="text-3xl font-bold"
        />
        
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          className="min-h-[500px] p-4"
        />
        
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/blog')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save as Draft'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;