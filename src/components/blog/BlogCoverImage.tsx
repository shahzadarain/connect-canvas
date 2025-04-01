
import React from 'react';

const PLACEHOLDER_IMAGES = [
  'photo-1488590528505-98d2b5aba04b',
  'photo-1518770660439-4636190af475',
  'photo-1461749280684-dccba630e2f6',
  'photo-1486312338219-ce68d2c6f44d',
  'photo-1581091226825-a6a2a5aee158',
  'photo-1531297484001-80022131f5a1',
  'photo-1487058792275-0ad4aaf24ca7',
  'photo-1498050108023-c5249f4df085',
];

interface BlogCoverImageProps {
  featuredImage?: string | null;
}

export const BlogCoverImage = ({ featuredImage }: BlogCoverImageProps) => {
  const [imageError, setImageError] = React.useState(false);

  const getRandomPlaceholderImage = () => {
    const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
    const imageId = PLACEHOLDER_IMAGES[randomIndex];
    return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=2000&q=80`;
  };

  const processImageUrl = (url: string) => {
    console.log('Processing cover image URL:', url);
    
    if (!url) {
      console.log('No URL provided, using placeholder');
      return getRandomPlaceholderImage();
    }
    
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log('Using full URL:', url);
      return url;
    }
    
    // Handle lovable-uploads paths
    if (url.startsWith('/lovable-uploads/')) {
      const fullUrl = `${window.location.origin}${url}`;
      console.log('Using lovable-uploads URL:', fullUrl);
      return fullUrl;
    }
    
    // Handle relative paths
    const fullUrl = url.startsWith('/') 
      ? `${window.location.origin}${url}`
      : `${window.location.origin}/${url}`;
    
    console.log('Final processed URL:', fullUrl);
    return fullUrl;
  };

  // Use a placeholder if there's an error or no image
  const finalImageUrl = imageError || !featuredImage
    ? getRandomPlaceholderImage()
    : processImageUrl(featuredImage);

  return (
    <div className="relative aspect-[2/1] rounded-xl overflow-hidden shadow-2xl mb-12">
      <img
        src={finalImageUrl}
        alt="Blog post cover"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        onError={() => {
          console.error('Error loading image:', featuredImage);
          setImageError(true);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};
