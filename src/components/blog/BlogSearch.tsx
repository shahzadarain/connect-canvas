import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogSearchProps {
  onSearch: (term: string) => void;
}

export const BlogSearch = ({ onSearch }: BlogSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        type="search"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-8"
      />
    </div>
  );
};