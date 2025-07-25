'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  createBoardSchema,
  type CreateBoardSchema,
} from '@/lib/validations/board';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BoardCreationFormProps {
  onSuccess?: (board: any) => void;
}

export function BoardCreationForm({ onSuccess }: BoardCreationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateBoardSchema>({
    title: '',
    recipientName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CreateBoardSchema, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    try {
      createBoardSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};

      if (error.errors) {
        error.errors.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
      }

      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create board');
      }

      setFormData({ title: '', recipientName: '' });

      if (onSuccess) {
        onSuccess(data.board);
      } else {
        router.push(`/boards/${data.board.id}/manage`);
      }
    } catch (error) {
      console.error('Error creating board:', error);
      setErrors({
        submit:
          error instanceof Error ? error.message : 'Failed to create board',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Appreciation Board</CardTitle>
        <CardDescription>
          Create a new board to collect appreciation messages for someone
          special.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Board Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Sarah's Birthday Board"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="recipientName"
              className="block text-sm font-medium mb-1"
            >
              Recipient Name *
            </label>
            <input
              id="recipientName"
              type="text"
              value={formData.recipientName}
              onChange={(e) =>
                handleInputChange('recipientName', e.target.value)
              }
              placeholder="e.g., Sarah Johnson"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.recipientName ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.recipientName}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Board...' : 'Create Board'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
