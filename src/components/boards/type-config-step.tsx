'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BasicInfoData, TypeConfigData } from '@/types/multi-step-form';
import {
  Box,
  BriefcaseBusiness,
  Hand,
  PartyPopper,
  Rocket,
  Smile,
  TreePalm,
} from 'lucide-react';

interface TypeConfigStepProps {
  boardType: BasicInfoData['boardType'];
  data: TypeConfigData;
  onChange: (data: Partial<TypeConfigData>) => void;
  errors: Record<string, string>;
  touchedFields?: Set<string>;
}

// Appreciation theme options
const appreciationThemeOptions = [
  {
    value: 'professional' as const,
    label: 'Professional',
    description: 'Formal and business-appropriate tone',
    icon: <BriefcaseBusiness className="h-8 w-8" />,
  },
  {
    value: 'casual' as const,
    label: 'Casual',
    description: 'Relaxed and friendly atmosphere',
    icon: <Smile className="h-8 w-8" />,
  },
  {
    value: 'celebration' as const,
    label: 'Celebration',
    description: 'Festive and joyful mood',
    icon: <PartyPopper className="h-8 w-8" />,
  },
];

// Age display options for birthday boards
const ageDisplayOptions = [
  {
    value: 'show' as const,
    label: 'Show Age',
    description: 'Display the exact age on the board',
  },
  {
    value: 'hide' as const,
    label: 'Hide Age',
    description: 'Keep the age private',
  },
  {
    value: 'milestone-only' as const,
    label: 'Milestone Only',
    description: 'Show only milestone ages (e.g., 30, 40, 50)',
  },
];

// Farewell type options
const farewellTypeOptions = [
  {
    value: 'retirement' as const,
    label: 'Retirement',
    description: 'Celebrating the end of a career',
    icon: <TreePalm />,
  },
  {
    value: 'job-change' as const,
    label: 'New Job',
    description: 'Moving to a new opportunity',
    icon: <Rocket />,
  },
  {
    value: 'relocation' as const,
    label: 'Relocation',
    description: 'Moving to a new location',
    icon: <Box />,
  },
  {
    value: 'other' as const,
    label: 'Other',
    description: 'Other reason for farewell',
    icon: <Hand />,
  },
];

const backgroundColorOptions = [
  { value: '#2563EB', label: 'Blue', color: 'bg-blue-600' },
  { value: '#059669', label: 'Green', color: 'bg-green-600' },
  { value: '#D97706', label: 'Amber', color: 'bg-amber-600' },
  { value: '#DC2626', label: 'Red', color: 'bg-red-600' },
  { value: '#7C3AED', label: 'Purple', color: 'bg-purple-600' },
  { value: '#0D9488', label: 'Teal', color: 'bg-teal-600' },
  { value: '#0284C7', label: 'Sky', color: 'bg-sky-600' },
  { value: '#65A30D', label: 'Lime', color: 'bg-lime-600' },
  { value: '#DB2777', label: 'Pink', color: 'bg-pink-600' },
  { value: '#EA580C', label: 'Orange', color: 'bg-orange-600' },
];

export function TypeConfigStep({
  boardType,
  data,
  onChange,
  errors,
  touchedFields,
}: TypeConfigStepProps) {
  const handleFieldChange = (field: keyof TypeConfigData, value: any) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

  const handleToggle = (field: keyof TypeConfigData) => {
    const currentValue = data[field] as boolean;
    handleFieldChange(field, !currentValue);
  };

  const handleDatePickerChange = (
    field: keyof TypeConfigData,
    date: Date | undefined
  ) => {
    if (date) {
      handleFieldChange(field, date);
    } else {
      handleFieldChange(field, undefined);
    }
  };

  const renderAppreciationConfig = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">
          Choose the theme for your appreciation board
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {appreciationThemeOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                data.appreciationTheme === option.value
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              )}
              onClick={() =>
                handleFieldChange('appreciationTheme', option.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFieldChange('appreciationTheme', option.value);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={data.appreciationTheme === option.value}
            >
              <CardHeader>
                <div className="flex flex-col items-center gap-1">
                  <span className="p-1 mb-2 text-primary">{option.icon}</span>
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  <CardDescription className="text-sm text-center">
                    {option.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {errors.appreciationTheme &&
          touchedFields?.has('appreciationTheme') && (
            <p className="text-sm text-destructive">
              {errors.appreciationTheme}
            </p>
          )}
      </div>

      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">Display Options</Label>
        <Card
          className={cn(
            'cursor-pointer transition-all hover:shadow-sm',
            data.showContributorNames
              ? 'ring-2 ring-primary border-primary'
              : 'hover:border-primary/50'
          )}
          onClick={() => handleToggle('showContributorNames')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle('showContributorNames');
            }
          }}
          tabIndex={0}
          role="button"
          aria-pressed={data.showContributorNames}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                  data.showContributorNames
                    ? 'border-primary bg-primary'
                    : 'border-gray-300'
                )}
              >
                {data.showContributorNames && (
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
                <p className="font-medium">Show contributor names</p>
                <p className="text-sm text-muted-foreground">
                  Display the names of people who contributed to the board
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBirthdayConfig = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="birthdayDate" className="text-base font-semibold">
          Birthday Date (Optional)
        </Label>
        <DatePicker
          date={data.birthdayDate}
          onDateChange={(date) => handleDatePickerChange('birthdayDate', date)}
          placeholder="Select birthday date"
          error={!!errors.birthdayDate}
          className="text-base"
        />
        <p className="text-sm text-muted-foreground">
          Setting the birthday date helps personalize the board
        </p>
        {errors.birthdayDate && touchedFields?.has('birthdayDate') && (
          <p className="text-sm text-destructive">{errors.birthdayDate}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">
          Age Display Preference
        </Label>
        <div className="space-y-2">
          {ageDisplayOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'cursor-pointer transition-all hover:shadow-sm',
                data.ageDisplay === option.value
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              )}
              onClick={() => handleFieldChange('ageDisplay', option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFieldChange('ageDisplay', option.value);
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={data.ageDisplay === option.value}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                      data.ageDisplay === option.value
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    )}
                  >
                    {data.ageDisplay === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {errors.ageDisplay && touchedFields?.has('ageDisplay') && (
          <p className="text-sm text-destructive">{errors.ageDisplay}</p>
        )}
      </div>
    </div>
  );

  // Render farewell-specific configuration
  const renderFarewellConfig = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          What type of farewell is this?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {farewellTypeOptions.map((option) => (
            <Card
              key={option.value}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                data.farewellType === option.value
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              )}
              onClick={() => handleFieldChange('farewellType', option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFieldChange('farewellType', option.value);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={data.farewellType === option.value}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <CardDescription className="text-sm">
                      {option.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {errors.farewellType && touchedFields?.has('farewellType') && (
          <p className="text-sm text-destructive">{errors.farewellType}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastWorkingDay" className="text-base font-semibold">
          Last Working Day (Optional)
        </Label>
        <DatePicker
          date={data.lastWorkingDay}
          onDateChange={(date) =>
            handleDatePickerChange('lastWorkingDay', date)
          }
          placeholder="Select last working day"
          error={!!errors.lastWorkingDay}
          className="text-base"
        />
        <p className="text-sm text-muted-foreground">
          This helps contributors know the timeline for their messages
        </p>
        {errors.lastWorkingDay && touchedFields?.has('lastWorkingDay') && (
          <p className="text-sm text-destructive">{errors.lastWorkingDay}</p>
        )}
      </div>
    </div>
  );

  const renderGeneralConfig = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Label htmlFor="customMessage" className="text-sm text-primary">
          Custom Message (Optional)
        </Label>
        <textarea
          id="customMessage"
          placeholder="Add a personal message or instructions for contributors..."
          value={data.customMessage || ''}
          onChange={(e) => handleFieldChange('customMessage', e.target.value)}
          className={cn(
            'w-full min-h-[100px] p-4 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none rounded-md',
            errors.customMessage && 'border-destructive'
          )}
          maxLength={500}
        />
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            This message will be displayed at the top of your board
          </p>
          <p className="text-sm text-muted-foreground">
            {(data.customMessage || '').length}/500
          </p>
        </div>
        {errors.customMessage && touchedFields?.has('customMessage') && (
          <p className="text-sm text-destructive">{errors.customMessage}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Label className="text-sm text-primary">
          Background Color (Optional)
        </Label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {backgroundColorOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                'cursor-pointer rounded-lg transition-all hover:scale-105',
                data.backgroundColor === option.value
                  ? 'ring-2 ring-offset-2 ring-teal'
                  : ''
              )}
              onClick={() => handleFieldChange('backgroundColor', option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFieldChange('backgroundColor', option.value);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={data.backgroundColor === option.value}
              aria-label={`Select ${option.label} background color`}
            >
              <div className={cn('w-full h-12 rounded-lg', option.color)} />
            </div>
          ))}
        </div>

        {errors.backgroundColor && touchedFields?.has('backgroundColor') && (
          <p className="text-sm text-destructive">{errors.backgroundColor}</p>
        )}
      </div>
    </div>
  );

  const getConfigContent = () => {
    switch (boardType) {
      case 'appreciation':
        return (
          <div className="space-y-8">
            {renderAppreciationConfig()}
            {renderGeneralConfig()}
          </div>
        );
      case 'birthday':
        return (
          <div className="space-y-8">
            {renderBirthdayConfig()}
            {renderGeneralConfig()}
          </div>
        );
      case 'farewell':
        return (
          <div className="space-y-8">
            {renderFarewellConfig()}
            {renderGeneralConfig()}
          </div>
        );
      default:
        return renderGeneralConfig();
    }
  };

  // Get step title based on board type
  const getStepTitle = () => {
    switch (boardType) {
      case 'appreciation':
        return 'Appreciation Board Settings';
      case 'birthday':
        return 'Birthday Board Settings';
      case 'farewell':
        return 'Farewell Board Settings';
      default:
        return 'Board Settings';
    }
  };

  // Get step description based on board type
  const getStepDescription = () => {
    switch (boardType) {
      case 'appreciation':
        return 'Customize how your appreciation board looks and feels';
      case 'birthday':
        return 'Set up birthday-specific options for your board';
      case 'farewell':
        return 'Configure farewell details and preferences';
      default:
        return 'Customize your board settings and appearance';
    }
  };

  return <div className="space-y-6">{getConfigContent()}</div>;
}
