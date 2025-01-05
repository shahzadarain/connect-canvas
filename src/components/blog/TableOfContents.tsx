import { ListOrdered } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Table of Contents</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
            >
              <a
                href={`#${item.id}`}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};