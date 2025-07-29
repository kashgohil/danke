'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Board } from '@/lib/db';
import { useState } from 'react';

interface SimpleBoardCreationFormProps {
  onSuccess?: (board: Board) => void;
  onCancel?: () => void;
  onStart?: () => void;
}

function SimpleBoardCreationFormContent({
  onSuccess,
  onCancel,
  onStart,
}: SimpleBoardCreationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    recipientName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Board title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Board title must be less than 255 characters';
    }

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    } else if (formData.recipientName.length > 255) {
      newErrors.recipientName =
        'Recipient name must be less than 255 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      onStart?.();

      const submissionData = {
        title: formData.title.trim(),
        recipientName: formData.recipientName.trim(),
        boardType: 'general' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public' as const,
        typeConfig: {},
      };

      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      const board = result.board;

      if (!board) {
        throw new Error('No board data received from server');
      }

      onSuccess?.(board);
    } catch (error) {
      console.error('Error creating board:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while creating the board.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-danke-900 dark:text-danke-900">
          Create Your Board
        </h1>
        <p className="text-danke-900 dark:text-danke-900">
          Create a simple board quickly with basic settings
        </p>
      </div>

      <Card className="p-8">
        {submitError && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-destructive"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-destructive">
                  Error Creating Board
                </h3>
                <p className="mt-1 text-sm text-destructive/80">
                  {submitError}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitError(null)}
                className="flex-shrink-0 text-destructive/60 hover:text-destructive"
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Board Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter a title for your board"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              disabled={isSubmitting}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              type="text"
              placeholder="Who is this board for?"
              value={formData.recipientName}
              onChange={(e) =>
                handleFieldChange('recipientName', e.target.value)
              }
              disabled={isSubmitting}
              className={errors.recipientName ? 'border-destructive' : ''}
            />
            {errors.recipientName && (
              <p className="text-sm text-destructive">{errors.recipientName}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Creating Board...' : 'Create Board'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export function SimpleBoardCreationForm(props: SimpleBoardCreationFormProps) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('SimpleBoardCreationForm error:', error, errorInfo);
      }}
    >
      <SimpleBoardCreationFormContent {...props} />
    </ErrorBoundary>
  );
}
