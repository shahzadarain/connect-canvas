
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPageHeaderProps {
  isAdmin: boolean;
}

export const BlogPageHeader = ({ isAdmin }: BlogPageHeaderProps) => {
  return (
    <div className="flex justify-end items-center mb-8">
      {isAdmin && (
        <Link to="/blog/editor">
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      )}
    </div>
  );
};

