'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { boardConfigStepSchema } from '@/lib/validations/board';
import { BoardConfigData } from '@/types/multi-step-form';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

interface BoardConfigStepProps {
  data: BoardConfigData;
  onChange: (data: Partial<BoardConfigData>) => void;
  onValidationChange: (isValid: boolean) => void;
  errors: Record<string, string>;
}

// Posting mode options
const postingModeOptions = [
  {
    value: 'single' as const,
    label: 'Single Post Mode',
    description: 'Each contributor can post only one message',
    icon: '📝',
    details: 'Perfect for collecting focused feedback or signatures',
  },
  {
    value: 'multiple' as const,
    label: 'Multiple Posts Mode',
    description: 'Contributors can post multiple messages',
    icon: '📚',
    details: 'Great for ongoing conversations and sharing memories',
  },
];

// Board visibility options
const visibilityOptions = [
  {
    value: 'public' as const,
    label: 'Public Board',
    description: 'Anyone with the link can view the board',
    icon: '🌐',
    details: 'Board is discoverable and shareable',
  },
  {
    value: 'private' as const,
    label: 'Private Board',
    description: 'Only people you invite can view the board',
    icon: '🔒',
    details: 'More secure and controlled access',
  },
];

export function BoardConfigStep({
  data,
  onChange,
  onValidationChange,
  errors,
}: BoardConfigStepProps) {
  const [localData, setLocalData] = useState<BoardConfigData>(data);
  const [localErrors, setLocalErrors] =
    useState<Record<string, string>>(errors);

  // Validate the current data
  const validateData = useCallback(
    (dataToValidate: BoardConfigData) => {
      try {
        // Transform data for validation (handle date conversion)
        const validationData = {
          ...dataToValidate,
          maxPostsPerUser: dataToValidate.maxPostsPerUser?.toString() || null,
          expirationDate: dataToValidate.expirationDate
            ? new Date(dataToValidate.expirationDate).toISOString()
            : undefined,
        };

        boardConfigStepSchema.parse(validationData);
        setLocalErrors({});
        onValidationChange(true);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.issues.forEach((err) => {
            if (err.path.length > 0) {
              newErrors[err.path[0] as string] = err.message;
            }
          });
          setLocalErrors(newErrors);
          onValidationChange(false);
          return newErrors;
        }
        onValidationChange(false);
        return {};
      }
    },
    [onValidationChange]
  );

  // Validate on data changes
  useEffect(() => {
    validateData(localData);
  }, [localData, validateData]);

  // Update local errors when external errors change
  useEffect(() => {
    setLocalErrors(errors);
  }, [errors]);

  const handleFieldChange = (field: keyof BoardConfigData, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onChange(updatedData);
  };

  const handleToggle = (field: keyof BoardConfigData) => {
    const currentValue = localData[field] as boolean;
    handleFieldChange(field, !currentValue);
  };

  // Format date for input (YYYY-MM-DDTHH:MM)
  const formatDateTimeForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Format as YYYY-MM-DDTHH:MM for datetime-local input
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  // Handle date input change
  const handleDateTimeChange = (value: string) => {
    if (value) {
      // Convert to ISO string for storage
      const date = new Date(value);
      handleFieldChange('expirationDate', date.toISOString());
    } else {
      handleFieldChange('expirationDate', undefined);
    }
  };

  // Handle max posts per user change
  const handleMaxPostsChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? undefined : parseInt(value, 10);
      handleFieldChange('maxPostsPerUser', numValue);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Board Configuration</h2>
        <p className="text-muted-foreground">
          Configure how posts are managed and who can access your board
        </p>
      </div>

      {/* Posting Mode Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          How should posting work on this board?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {postingModeOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                localData.postingMode === option.value
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              )}
              onClick={() => handleFieldChange('postingMode', option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFieldChange('postingMode', option.value);
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={localData.postingMode === option.value}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">{option.icon}</span>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <CardDescription className="text-sm mb-2">
                      {option.description}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">
                      {option.details}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {localErrors.postingMode && (
          <p className="text-sm text-destructive">{localErrors.postingMode}</p>
        )}
      </div>

      {/* Max Posts Per User (only for multiple mode) */}
      {localData.postingMode === 'multiple' && (
        <div className="space-y-2">
          <Label htmlFor="maxPostsPerUser" className="text-base font-semibold">
            Maximum Posts Per User (Optional)
          </Label>
          <Input
            id="maxPostsPerUser"
            type="number"
            min="1"
            max="50"
            placeholder="No limit"
            value={localData.maxPostsPerUser?.toString() || ''}
            onChange={(e) => handleMaxPostsChange(e.target.value)}
            error={!!localErrors.maxPostsPerUser}
            className="text-base max-w-xs"
          />
          <p className="text-sm text-muted-foreground">
            Leave empty for no limit. Maximum allowed is 50 posts per user.
          </p>
          {localErrors.maxPostsPerUser && (
            <p className="text-sm text-destructive">
              {localErrors.maxPostsPerUser}
            </p>
          )}
        </div>
      )}

      {/* Board Settings Toggles */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Board Settings</Label>
        <div className="space-y-3">
          {/* Moderation Toggle */}
          <Card
            className={cn(
              'cursor-pointer transition-all hover:shadow-sm',
              localData.moderationEnabled
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            )}
            onClick={() => handleToggle('moderationEnabled')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle('moderationEnabled');
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={localData.moderationEnabled}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                    localData.moderationEnabled
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  )}
                >
                  {localData.moderationEnabled && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Enable Moderation</p>
                  <p className="text-sm text-muted-foreground">
                    Review and approve posts before they appear on the board
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended for sensitive occasions or public boards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anonymous Posting Toggle */}
          <Card
            className={cn(
              'cursor-pointer transition-all hover:shadow-sm',
              localData.allowAnonymous
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            )}
            onClick={() => handleToggle('allowAnonymous')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle('allowAnonymous');
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={localData.allowAnonymous}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                    localData.allowAnonymous
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  )}
                >
                  {localData.allowAnonymous && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Allow Anonymous Posts</p>
                  <p className="text-sm text-muted-foreground">
                    Let contributors post without revealing their identity
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Encourages honest feedback and participation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Board Visibility */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          Who can view this board?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibilityOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                localData.boardVisibility === option.value
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              )}
              onClick={() => handleFieldChange('boardVisibility', option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFieldChange('boardVisibility', option.value);
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={localData.boardVisibility === option.value}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">{option.icon}</span>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <CardDescription className="text-sm mb-2">
                      {option.description}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">
                      {option.details}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {localErrors.boardVisibility && (
          <p className="text-sm text-destructive">
            {localErrors.boardVisibility}
          </p>
        )}
      </div>

      {/* Expiration Date */}
      <div className="space-y-2">
        <Label htmlFor="expirationDate" className="text-base font-semibold">
          Board Expiration (Optional)
        </Label>
        <Input
          id="expirationDate"
          type="datetime-local"
          value={formatDateTimeForInput(localData.expirationDate)}
          onChange={(e) => handleDateTimeChange(e.target.value)}
          error={!!localErrors.expirationDate}
          className="text-base max-w-md"
          min={new Date().toISOString().slice(0, 16)} // Prevent past dates
        />
        <p className="text-sm text-muted-foreground">
          Set when this board should automatically become read-only. Leave empty
          for no expiration.
        </p>
        {localErrors.expirationDate && (
          <p className="text-sm text-destructive">
            {localErrors.expirationDate}
          </p>
        )}
      </div>

      {/* Configuration Summary */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Configuration Summary</Label>
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">
                    Posting Mode
                  </p>
                  <p className="capitalize">
                    {localData.postingMode === 'single'
                      ? 'Single post per user'
                      : 'Multiple posts allowed'}
                  </p>
                  {localData.postingMode === 'multiple' &&
                    localData.maxPostsPerUser && (
                      <p className="text-xs text-muted-foreground">
                        Max {localData.maxPostsPerUser} posts per user
                      </p>
                    )}
                </div>

                <div>
                  <p className="font-medium text-muted-foreground">
                    Board Visibility
                  </p>
                  <p className="capitalize">{localData.boardVisibility}</p>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground">
                    Moderation
                  </p>
                  <p>{localData.moderationEnabled ? 'Enabled' : 'Disabled'}</p>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground">
                    Anonymous Posts
                  </p>
                  <p>{localData.allowAnonymous ? 'Allowed' : 'Not allowed'}</p>
                </div>

                {localData.expirationDate && (
                  <div className="md:col-span-2">
                    <p className="font-medium text-muted-foreground">
                      Expires On
                    </p>
                    <p>{new Date(localData.expirationDate).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
