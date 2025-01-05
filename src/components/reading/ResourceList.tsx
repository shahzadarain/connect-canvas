import { ResourceCard } from "./ResourceCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Resource {
  id: number;
  title: string;
  author: string | null;
  type: string;
  external_url: string | null;
  category: string | null;
  description?: string;
}

interface ResourceListProps {
  resources: Resource[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ResourceList = ({ resources, searchQuery, onSearchChange }: ResourceListProps) => {
  const filteredResources = resources.filter(resource => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(searchTerm) ||
      (resource.author?.toLowerCase().includes(searchTerm)) ||
      (resource.description?.toLowerCase().includes(searchTerm)) ||
      (resource.category?.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <>
      <div className="w-full max-w-2xl mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search resources by title, author, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-md hover:shadow-lg transition-all"
          />
          <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-8">
          {searchQuery ? "No resources found matching your search." : "No resources available at the moment."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </>
  );
};