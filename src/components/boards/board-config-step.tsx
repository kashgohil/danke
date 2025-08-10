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
import { BoardConfigData } from '@/types/multi-step-form';
import { Globe, LayoutDashboard, Lock, StickyNote, X } from 'lucide-react';
import { useState } from 'react';

interface BoardConfigStepProps {
  data: BoardConfigData;
  onChange: (data: Partial<BoardConfigData>) => void;
  errors: Record<string, string>;
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

function EmailDomainInput({
  value,
  onChange,
  placeholder,
  type,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  type: 'email' | 'domain';
}) {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeItem = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addItem}
        placeholder={placeholder}
        className="text-sm"
      />
      {value.length > 0 && (
        <div className="flex flex-wrap">
          {value.map((item) => (
            <div
              key={item}
              className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-lg text-sm border"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BoardConfigStep({
  data,
  onChange,
  errors,
  touchedFields,
}: BoardConfigStepProps) {
  const handleFieldChange = (field: keyof BoardConfigData, value: any) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

  const handleToggle = (field: keyof BoardConfigData) => {
    const currentValue = data[field] as boolean;
    handleFieldChange(field, !currentValue);
  };

  const handleDateTimePickerChange = (date: Date | undefined) => {
    if (date) {
      console.log(date);
      handleFieldChange('expirationDate', date);
    } else {
      handleFieldChange('expirationDate', undefined);
    }
  };

  const handleMaxPostsChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? undefined : parseInt(value, 10);
      handleFieldChange('maxPostsPerUser', numValue);
    }
  };

  function postingMode() {
    return (
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
                data.postingMode === option.value
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
              aria-checked={data.postingMode === option.value}
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
        {errors.postingMode && touchedFields?.has('postingMode') && (
          <p className="text-sm text-destructive">{errors.postingMode}</p>
        )}
      </div>
    );
  }

  function maxPostsPerUser() {
    if (data.postingMode !== 'multiple') return null;
    return (
      <div className="flex flex-col gap-4">
        <Label htmlFor="maxPostsPerUser" className="text-sm text-primary">
          Maximum Posts Per User (Optional)
        </Label>
        <Input
          id="maxPostsPerUser"
          type="number"
          min="1"
          max="50"
          placeholder="No limit"
          value={data.maxPostsPerUser?.toString() || ''}
          onChange={(e) => handleMaxPostsChange(e.target.value)}
          error={!!errors.maxPostsPerUser}
          className="text-base max-w-xs"
        />
        <p className="text-sm text-muted-foreground">
          Leave empty for no limit. Maximum allowed is 50 posts per user.
        </p>
        {errors.maxPostsPerUser && touchedFields?.has('maxPostsPerUser') && (
          <p className="text-sm text-destructive">{errors.maxPostsPerUser}</p>
        )}
      </div>
    );
  }

  function boardSettings() {
    return (
      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">Board Settings</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={cn(
              'flex-1 cursor-pointer transition-all hover:shadow-sm',
              data.moderationEnabled
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
            aria-pressed={data.moderationEnabled}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                    data.moderationEnabled
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  )}
                >
                  {data.moderationEnabled && (
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
                    Review before they appear on board
                  </p>
                  <p className="text-xs">
                    sensitive occasions or public boards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              'flex-1 cursor-pointer transition-all hover:shadow-sm',
              data.allowAnonymous
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
            aria-pressed={data.allowAnonymous}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                    data.allowAnonymous
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  )}
                >
                  {data.allowAnonymous && (
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
                    post without revealing their identity
                  </p>
                  <p className="text-xs">honest feedback and participation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function visibility() {
    return (
      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">Who can view this board?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibilityOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                data.boardVisibility === option.value
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
              aria-checked={data.boardVisibility === option.value}
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
        {errors.boardVisibility && touchedFields?.has('boardVisibility') && (
          <p className="text-sm text-destructive">{errors.boardVisibility}</p>
        )}
      </div>
    );
  }

  function visibilityRestrictions() {
    if (data.boardVisibility !== 'private') return null;

    return (
      <div className="flex flex-col gap-6 p-4 border rounded-lg bg-muted/30">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Access Restrictions</Label>
          <p className="text-sm text-muted-foreground">
            Control who can access this private board by email or domain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <Label className="text-sm text-primary">Allowed Domains</Label>
            <EmailDomainInput
              value={data.allowedDomains || []}
              onChange={(domains) =>
                handleFieldChange('allowedDomains', domains)
              }
              placeholder="company.com"
              type="domain"
            />
            <p className="text-xs text-muted-foreground">
              Only users with these email domains can access the board
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="text-sm text-primary">Blocked Domains</Label>
            <EmailDomainInput
              value={data.blockedDomains || []}
              onChange={(domains) =>
                handleFieldChange('blockedDomains', domains)
              }
              placeholder="competitor.com"
              type="domain"
            />
            <p className="text-xs text-muted-foreground">
              Users with these email domains cannot access the board
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="text-sm text-primary">Allowed Emails</Label>
            <EmailDomainInput
              value={data.allowedEmails || []}
              onChange={(emails) => handleFieldChange('allowedEmails', emails)}
              placeholder="user@example.com"
              type="email"
            />
            <p className="text-xs text-muted-foreground">
              Only these specific email addresses can access the board
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="text-sm text-primary">Blocked Emails</Label>
            <EmailDomainInput
              value={data.blockedEmails || []}
              onChange={(emails) => handleFieldChange('blockedEmails', emails)}
              placeholder="blocked@example.com"
              type="email"
            />
            <p className="text-xs text-muted-foreground">
              These specific email addresses cannot access the board
            </p>
          </div>
        </div>
      </div>
    );
  }

  function expiration() {
    return (
      <div className="flex flex-col gap-4">
        <Label htmlFor="expirationDate" className="text-sm text-primary">
          Board Expiration (Optional)
        </Label>
        <DateTimePicker
          date={data.expirationDate}
          onDateTimeChange={handleDateTimePickerChange}
          placeholder="Select expiration date and time"
          error={!!errors.expirationDate}
          className="text-base w-fit"
          min={new Date().toISOString().slice(0, 16)}
        />
        <p className="text-sm text-muted-foreground">
          Set when this board should automatically become read-only. Leave empty
          for no expiration.
        </p>
        {errors.expirationDate && touchedFields?.has('expirationDate') && (
          <p className="text-sm text-destructive">{errors.expirationDate}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {postingMode()}
      {maxPostsPerUser()}
      {boardSettings()}
      {visibility()}
      {visibilityRestrictions()}
      {expiration()}
    </div>
  );
}
