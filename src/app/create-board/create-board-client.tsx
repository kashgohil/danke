'use client';

import { MultiStepBoardCreationForm } from '@/components/boards/board-creation-form';
import { SimpleBoardCreationForm } from '@/components/boards/simple-board-creation-form';
import { Button } from '@/components/ui/button';
import { Board } from '@/lib/db';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CreateBoardClientProps {
  enableMultiStepForm: boolean;
}

export function CreateBoardClient({
  enableMultiStepForm,
}: CreateBoardClientProps) {
  const router = useRouter();
  const [useMultiStep, setUseMultiStep] = useState(enableMultiStepForm);
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
      {/* Form Type Toggle - Only show if multi-step is enabled */}
      {enableMultiStepForm && !isCreating && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-card border border-border rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">
                Board Creation Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose between a quick simple form or a detailed multi-step
                wizard
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant={!useMultiStep ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUseMultiStep(false)}
                className="flex-1 sm:flex-initial"
              >
                Simple Form
              </Button>
              <Button
                variant={useMultiStep ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUseMultiStep(true)}
                className="flex-1 sm:flex-initial"
              >
                <Settings className="w-4 h-4 mr-2" />
                Multi-Step
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="w-full">
        {useMultiStep ? (
          <MultiStepBoardCreationForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            onStart={handleFormStart}
          />
        ) : (
          <SimpleBoardCreationForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            onStart={handleFormStart}
          />
        )}
      </div>

      {/* Loading Overlay */}
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
