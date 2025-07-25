'use client';

import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface PostContentProps {
  content: any;
  className?: string;
}

export function PostContent({ content, className }: PostContentProps) {
  return (
    <RichTextEditor content={content} editable={false} className={className} />
  );
}
