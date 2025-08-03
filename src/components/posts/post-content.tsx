'use client';

import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { cn } from '@/lib/utils';

interface PostContentProps {
  content: string;
  className?: string;
}

export function PostContent({ content, className }: PostContentProps) {
  if (!content || content.trim() === '') {
    return (
      <div className={cn('text-gray-500 italic text-sm', className)}>
        No content
      </div>
    );
  }

  return (
    <div className={cn('prose prose-sm max-w-none', className)}>
      <RichTextEditor
        content={content}
        editable={false}
        className="border-0 p-0 min-h-0 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0"
      />
    </div>
  );
}
