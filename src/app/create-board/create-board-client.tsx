'use client';

import { MultiStepBoardCreationForm } from '@/components/boards/board-creation-form';
import { Board } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CreateBoardClient() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleSuccess = (board: Board) => {
    setIsCreating(false);
    // Navigate to the board management page
    router.push(`/boards/${board.id}/manage`);
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleFormStart = () => {
    setIsCreating(true);
  };

  return (
    <div className="w-full">
      <MultiStepBoardCreationForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        onStart={handleFormStart}
      />

      {isCreating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-sm mx-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <div>
                <h3 className="font-semibold">Creating Your Board</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we set up your board...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
