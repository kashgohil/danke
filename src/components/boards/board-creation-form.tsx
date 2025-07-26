'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingButton } from '@/components/ui/loading-states';
import { useFormValidation } from '@/hooks/use-form-validation';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import {
  createBoardSchema,
  type CreateBoardSchema,
} from '@/lib/validations/board';
import { AlertCircle, ArrowRight, Edit3, Sparkles, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BoardCreationFormProps {
  onSuccess?: (board: any) => void;
}

function BoardCreationFormContent({ onSuccess }: BoardCreationFormProps) {
  const router = useRouter();
  const { handleError } = useApiErrorHandler();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    errors,
    isValid,
    setValue,
    validateAll,
    clearAllErrors,
    reset,
    getFieldProps,
  } = useFormValidation<CreateBoardSchema>({
    schema: createBoardSchema,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const isFormValid = await validateAll();
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiRequest('/api/boards', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      reset();
      clearAllErrors();

      if (onSuccess) {
        onSuccess(data.board);
      } else {
        router.push(`/boards/${data.board.id}/manage`);
      }
    } catch (error) {
      const errorMessage = handleError(error);
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-primary-foreground">
                Create Danke Board
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Start collecting heartfelt messages for someone special
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-primary" />
                  Board Title
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={getFieldProps('title').value}
                  onChange={(e) => setValue('title', e.target.value)}
                  onBlur={getFieldProps('title').onBlur}
                  placeholder="e.g., Sarah's Birthday Celebration"
                  error={getFieldProps('title').error}
                  disabled={isLoading}
                />
                {errors.title && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.title}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="recipientName"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-secondary" />
                  Recipient Name
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="recipientName"
                  type="text"
                  value={getFieldProps('recipientName').value}
                  onChange={(e) => setValue('recipientName', e.target.value)}
                  onBlur={getFieldProps('recipientName').onBlur}
                  placeholder="e.g., Sarah Johnson"
                  error={getFieldProps('recipientName').error}
                  disabled={isLoading}
                />
                {errors.recipientName && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.recipientName}</span>
                  </div>
                )}
              </div>
            </div>

            {submitError && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                <span className="text-sm text-destructive">{submitError}</span>
              </div>
            )}

            <div className="pt-4">
              <LoadingButton
                type="submit"
                size="lg"
                className="w-full"
                loading={isLoading}
                loadingText="Creating Board..."
                disabled={!isValid}
              >
                <div className="flex items-center gap-2">
                  Create Board
                  <ArrowRight className="w-5 h-5" />
                </div>
              </LoadingButton>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Your board will be created with unique sharing links for viewing
                and posting
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function BoardCreationForm(props: BoardCreationFormProps) {
  return (
    <ErrorBoundary>
      <BoardCreationFormContent {...props} />
    </ErrorBoundary>
  );
}
