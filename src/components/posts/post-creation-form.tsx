'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { createPostSchema, type RichTextContent } from '@/lib/validations/post';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { z } from 'zod';

interface PostCreationFormProps {
  boardId: string;
  onPostCreated?: (post: any) => void;
  className?: string;
}

export function PostCreationForm({
  boardId,
  onPostCreated,
  className,
}: PostCreationFormProps) {
  const { isSignedIn, userId } = useAuth();
  const [content, setContent] = useState<RichTextContent | null>(null);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn || !userId) {
      setError('You must be signed in to post');
      return;
    }

    if (!content) {
      setError('Please write a message');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const validatedData = createPostSchema.parse({
        content,
        mediaUrls,
      });

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardId,
          ...validatedData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      const post = await response.json();

      setContent(null);
      setMediaUrls([]);

      onPostCreated?.(post);
    } catch (error) {
      console.error('Error creating post:', error);

      if (error instanceof z.ZodError) {
        setError('Please check your message content');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Please sign in to add your appreciation message.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Add Your Appreciation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Share your appreciation message..."
              className="min-h-[150px]"
            />
          </div>

          <div className="text-sm text-gray-500">
            Media upload functionality will be available soon.
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !content}
              className="min-w-[100px]"
            >
              {isSubmitting ? 'Posting...' : 'Post Message'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
