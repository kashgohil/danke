'use client';

import { PostEditDialog } from '@/components/posts/post-edit-dialog';
import { createContext, useContext, useState } from 'react';

interface PostEditContextType {
  openPostEdit: (postId: string) => void;
  closePostEdit: () => void;
}

const PostEditContext = createContext<PostEditContextType | undefined>(
  undefined
);

export function usePostEdit() {
  const context = useContext(PostEditContext);
  if (!context) {
    throw new Error('usePostEdit must be used within a PostEditProvider');
  }
  return context;
}

interface PostEditProviderProps {
  children: React.ReactNode;
}

export function PostEditProvider({ children }: PostEditProviderProps) {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPostEdit = (postId: string) => {
    setEditingPostId(postId);
    setIsOpen(true);
  };

  const closePostEdit = () => {
    setIsOpen(false);
    setEditingPostId(null);
  };

  const handlePostUpdated = (updatedPost: any) => {
    console.log('Post updated:', updatedPost);
  };

  return (
    <PostEditContext.Provider value={{ openPostEdit, closePostEdit }}>
      {children}
      <PostEditDialog
        postId={editingPostId}
        isOpen={isOpen}
        onClose={closePostEdit}
        onPostUpdated={handlePostUpdated}
      />
    </PostEditContext.Provider>
  );
}
