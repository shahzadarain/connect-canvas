import { Share2, Twitter, Linkedin, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center gap-4 my-8">
      <span className="flex items-center text-gray-600 dark:text-gray-400">
        <Share2 className="w-5 h-5 mr-2" />
        Share:
      </span>
      <div className="flex gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
};