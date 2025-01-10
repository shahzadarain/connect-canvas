import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SEOMetadataSectionProps {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onMetaKeywordsChange: (value: string[]) => void;
}

export const SEOMetadataSection = ({
  metaTitle,
  metaDescription,
  metaKeywords,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onMetaKeywordsChange,
}: SEOMetadataSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="meta-title">Meta Title</Label>
        <Input
          id="meta-title"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder="SEO title (recommended: 50-60 characters)"
          maxLength={60}
        />
        <div className="text-xs text-muted-foreground mt-1">
          {metaTitle.length}/60 characters
        </div>
      </div>

      <div>
        <Label htmlFor="meta-description">Meta Description</Label>
        <Textarea
          id="meta-description"
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder="SEO description (recommended: 150-160 characters)"
          maxLength={160}
        />
        <div className="text-xs text-muted-foreground mt-1">
          {metaDescription.length}/160 characters
        </div>
      </div>

      <div>
        <Label htmlFor="meta-keywords">Meta Keywords</Label>
        <Input
          id="meta-keywords"
          value={metaKeywords.join(', ')}
          onChange={(e) => {
            const keywords = e.target.value
              .split(',')
              .map(keyword => keyword.trim())
              .filter(keyword => keyword.length > 0);
            onMetaKeywordsChange(keywords);
          }}
          placeholder="Comma-separated keywords"
        />
      </div>
    </div>
  );
};