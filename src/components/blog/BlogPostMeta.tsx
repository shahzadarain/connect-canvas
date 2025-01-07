import React from 'react';
import { Helmet } from 'react-helmet';
import { BlogPost } from '@/integrations/supabase/types/blog';

interface BlogPostMetaProps {
  post: BlogPost['Row'];
}

export const BlogPostMeta = ({ post }: BlogPostMetaProps) => {
  return (
    <Helmet>
      <title>{post.title} | Shahzad ASGHAR</title>
      <meta name="description" content={post.meta_description || post.excerpt} />
      {post.meta_keywords && (
        <meta name="keywords" content={post.meta_keywords.join(', ')} />
      )}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.meta_description || post.excerpt} />
      {post.featured_image && (
        <meta property="og:image" content={post.featured_image} />
      )}
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={post.published_at || ''} />
      <meta property="article:author" content={post.author} />
      {post.tags && post.tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
  );
};