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
      bgColor: 'bg-[#1DA1F2]',
      hoverBg: 'hover:bg-[#0c85d0]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bgColor: 'bg-[#0A66C2]',
      hoverBg: 'hover:bg-[#084d93]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bgColor: 'bg-[#1877F2]',
      hoverBg: 'hover:bg-[#0c5dc9]'
    },
  ];

  return (
    <div className="border-t dark:border-gray-800 mt-12 pt-8">
      <div className="flex items-center gap-6">
        <span className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
          <Share2 className="w-5 h-5 mr-2" />
          Share this article
        </span>
        <div className="flex gap-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.bgColor} ${link.hoverBg} p-2.5 rounded-full text-white transition-colors duration-200`}
              aria-label={`Share on ${link.name}`}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};