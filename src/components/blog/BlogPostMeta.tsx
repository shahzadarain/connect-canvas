import React from 'react';
import { Helmet } from 'react-helmet';
import { BlogPost } from '@/integrations/supabase/types/blog';

interface BlogPostMetaProps {
  post: BlogPost['Row'];
}

export const BlogPostMeta = ({ post }: BlogPostMetaProps) => {
  // Calculate reading time based on content length
  const wordsPerMinute = 200;
  const wordCount = post.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Format date for schema
  const publishDate = post.published_at ? new Date(post.published_at).toISOString() : '';
  const modifiedDate = post.updated_at ? new Date(post.updated_at).toISOString() : publishDate;

  // Prepare schema.org Article markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    image: post.featured_image ? [post.featured_image] : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Shahzad ASGHAR',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/og-image.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href
    },
    articleBody: post.content,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`
  };

  // Prepare breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: `${window.location.origin}/blog`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: window.location.href
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{post.title} | Shahzad ASGHAR</title>
      <meta name="description" content={post.meta_description || post.excerpt || ''} />
      {post.meta_keywords && (
        <meta name="keywords" content={post.meta_keywords.join(', ')} />
      )}
      
      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
      {post.featured_image && (
        <meta property="og:image" content={post.featured_image} />
      )}
      <meta property="og:site_name" content="Shahzad ASGHAR" />
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:author" content={post.author} />
      {post.tags && post.tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shahzadasghar" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.meta_description || post.excerpt || ''} />
      {post.featured_image && (
        <meta name="twitter:image" content={post.featured_image} />
      )}
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content={`${readingTime} minutes`} />
      
      {/* Additional Meta Tags */}
      <meta name="reading_time" content={`${readingTime} minutes`} />
      <meta name="author" content={post.author} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};