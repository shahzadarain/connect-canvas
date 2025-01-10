import React from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditorActionsProps {
  postId?: number;
  status?: string;
  saving: boolean;
  onSave: (status: 'draft' | 'published') => Promise<void>;
  onDelete?: () => Promise<void>;
  autoSaveStatus: string;
}

export const EditorActions = ({
  postId,
  status,
  saving,
  onSave,
  onDelete,
  autoSaveStatus
}: EditorActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      {autoSaveStatus && (
        <span className="text-sm text-muted-foreground">{autoSaveStatus}</span>
      )}
      
      <Button 
        variant="outline"
        onClick={() => onSave('draft')}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Draft'}
      </Button>

      {status === 'published' ? (
        <Button 
          variant="outline"
          onClick={() => onSave('draft')}
          disabled={saving}
        >
          Unpublish
        </Button>
      ) : (
        <Button 
          onClick={() => onSave('published')}
          disabled={saving}
        >
          {saving ? 'Publishing...' : 'Publish'}
        </Button>
      )}

      {postId && onDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the blog post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};