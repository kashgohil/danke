'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { boardConfigStepSchema } from '@/lib/validations/board';
import { BoardConfigData } from '@/types/multi-step-form';
import { Globe, LayoutDashboard, Lock, StickyNote } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

interface BoardConfigStepProps {
  data: BoardConfigData;
  onChange: (data: Partial<BoardConfigData>) => void;
  onValidationChange: (isValid: boolean) => void;
  errors: Record<string, string>;
  onFieldTouch?: (field: string) => void;
  touchedFields?: Set<string>;
}

// Posting mode options
const postingModeOptions = [
  {
    value: 'single' as const,
    label: 'Single Post',
    description: 'one post per contributor',
    icon: <StickyNote className="h-8 w-8" />,
  },
  {
    value: 'multiple' as const,
    label: 'Multiple Posts',
    description: 'multiple posts per contributor',
    icon: <LayoutDashboard className="h-8 w-8" />,
  },
];

const visibilityOptions = [
  {
    value: 'public' as const,
    label: 'Public Board',
    description: 'Anyone with the link can view the board',
    icon: <Globe className="h-8 w-8" />,
  },
  {
    value: 'private' as const,
    label: 'Private Board',
    description: 'Only people you invite can view the board',
    icon: <Lock className="h-8 w-8" />,
  },
];

export function BoardConfigStep({
  data,
  onChange,
  onValidationChange,
  errors,
  onFieldTouch,
  touchedFields,
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
    onFieldTouch?.(field);
  };

  const handleToggle = (field: keyof BoardConfigData) => {
    const currentValue = localData[field] as boolean;
    handleFieldChange(field, !currentValue);
  };

  // Convert date string to Date object for picker
  const parseDateTime = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    try {
      return new Date(dateString);
    } catch {
      return undefined;
    }
  };

  // Handle datetime picker change
  const handleDateTimePickerChange = (date: Date | undefined) => {
    if (date) {
      // Store as ISO string for consistency
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
      {/* Posting Mode Selection */}
      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">
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
              <CardHeader className="p-6">
                <div className="flex flex-col items-center gap-1">
                  <span className="p-1 mb-2 text-primary">{option.icon}</span>
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {localErrors.postingMode && touchedFields?.has('postingMode') && (
          <p className="text-sm text-destructive">{localErrors.postingMode}</p>
        )}
      </div>

      {localData.postingMode === 'multiple' && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="maxPostsPerUser" className="text-sm">
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
          {localErrors.maxPostsPerUser &&
            touchedFields?.has('maxPostsPerUser') && (
              <p className="text-sm text-destructive">
                {localErrors.maxPostsPerUser}
              </p>
            )}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">Board Settings</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={cn(
              'flex-1 cursor-pointer transition-all hover:shadow-sm',
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
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
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
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-medium">Enable Moderation</p>
                  <p className="text-sm text-muted-foreground">
                    Review and approve posts before they appear on the board
                  </p>
                  <p className="text-xs">
                    Recommended for sensitive occasions or public boards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              'flex-1 cursor-pointer transition-all hover:shadow-sm',
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
            <CardContent className="p-6">
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
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-medium">Allow Anonymous Posts</p>
                  <p className="text-sm text-muted-foreground">
                    Let contributors post without revealing their identity
                  </p>
                  <p className="text-xs">
                    Encourages honest feedback and participation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">Who can view this board?</Label>
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
              <CardHeader>
                <div className="flex flex-col items-center gap-1">
                  <span className="p-1 mb-2 text-primary">{option.icon}</span>
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  <CardDescription className="text-sm mb-2">
                    {option.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {localErrors.boardVisibility &&
          touchedFields?.has('boardVisibility') && (
            <p className="text-sm text-destructive">
              {localErrors.boardVisibility}
            </p>
          )}
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="expirationDate" className="text-sm text-primary">
          Board Expiration (Optional)
        </Label>
        <DateTimePicker
          date={parseDateTime(localData.expirationDate)}
          onDateTimeChange={handleDateTimePickerChange}
          placeholder="Select expiration date and time"
          error={!!localErrors.expirationDate}
          className="text-base w-fit"
          min={new Date().toISOString().slice(0, 16)}
        />
        <p className="text-sm text-muted-foreground">
          Set when this board should automatically become read-only. Leave empty
          for no expiration.
        </p>
        {localErrors.expirationDate && touchedFields?.has('expirationDate') && (
          <p className="text-sm text-destructive">
            {localErrors.expirationDate}
          </p>
        )}
      </div>
    </div>
  );
}
