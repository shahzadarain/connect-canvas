import React from 'react';

const PLACEHOLDER_IMAGES = [
  'photo-1486718448742-163732cd1544',
  'photo-1439337153520-7082a56a81f4',
  'photo-1497604401993-f2e922e5cb0a',
  'photo-1473177104440-ffee2f376098',
  'photo-1494891848038-7bd202a2afeb',
  'photo-1551038247-3d9af20df552',
  'photo-1433832597046-4f10e10ac764',
  'photo-1493397212122-2b85dda8106b',
  'photo-1466442929976-97f336a657be',
  'photo-1492321936769-b49830bc1d1e',
];

interface BlogCoverImageProps {
  featuredImage?: string | null;
}

export const BlogCoverImage = ({ featuredImage }: BlogCoverImageProps) => {
  const getRandomPlaceholderImage = () => {
    const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
    const imageId = PLACEHOLDER_IMAGES[randomIndex];
    return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=2000&q=80`;
  };

  const coverImage = featuredImage || getRandomPlaceholderImage();

  return (
    <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
      <img
        src={coverImage}
        alt="Blog post cover"
        className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-105"
        onError={(e) => {
          console.error('Error loading image:', e);
          e.currentTarget.src = getRandomPlaceholderImage();
        }}
      />
    </div>
  );
};