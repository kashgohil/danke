'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { basicInfoStepSchema } from '@/lib/validations/board';
import { BasicInfoData } from '@/types/multi-step-form';
import {
  Baby,
  Cake,
  Drum,
  Flower2,
  Gem,
  GraduationCap,
  Handshake,
  Heart,
  Medal,
  Origami,
  PartyPopper,
  Rainbow,
  TreePalm,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { z } from 'zod';

interface BasicInfoStepProps {
  data: BasicInfoData;
  onChange: (data: Partial<BasicInfoData>) => void;
  onValidationChange: (isValid: boolean) => void;
  errors: Record<string, string>;
  onFieldTouch?: (field: string) => void;
  touchedFields?: Set<string>;
}

const boardTypeOptions = [
  {
    value: 'appreciation' as const,
    label: 'Appreciation Board',
    description: 'Celebrate achievements and show gratitude',
    icon: <PartyPopper />,
  },
  {
    value: 'birthday' as const,
    label: 'Birthday Board',
    description: "Celebrate someone's special day",
    icon: <Cake />,
  },
  {
    value: 'farewell' as const,
    label: 'Farewell Board',
    description: 'Say goodbye and share memories',
    icon: <Handshake />,
  },
  {
    value: 'welcome' as const,
    label: 'Welcome Board',
    description: 'Welcome new team members or colleagues',
    icon: <Drum />,
  },
  {
    value: 'congratulations' as const,
    label: 'Congratulations Board',
    description: 'Celebrate achievements and milestones',
    icon: <PartyPopper />,
  },
  {
    value: 'get-well' as const,
    label: 'Get Well Soon Board',
    description: 'Send healing thoughts and support',
    icon: <Flower2 />,
  },
  {
    value: 'sympathy' as const,
    label: 'Sympathy Board',
    description: 'Share condolences and support during difficult times',
    icon: <Origami />,
  },
  {
    value: 'holiday' as const,
    label: 'Holiday Board',
    description: 'Celebrate holidays and seasonal occasions',
    icon: <TreePalm />,
  },
  {
    value: 'anniversary' as const,
    label: 'Anniversary Board',
    description: 'Celebrate work anniversaries and milestones',
    icon: <Medal />,
  },
  {
    value: 'retirement' as const,
    label: 'Retirement Board',
    description: 'Honor someone entering retirement',
    icon: <Rainbow />,
  },
  {
    value: 'graduation' as const,
    label: 'Graduation Board',
    description: 'Celebrate educational achievements',
    icon: <GraduationCap />,
  },
  {
    value: 'baby-shower' as const,
    label: 'Baby Shower Board',
    description: 'Celebrate new arrivals and growing families',
    icon: <Baby />,
  },
  {
    value: 'wedding' as const,
    label: 'Wedding Board',
    description: 'Celebrate love and new beginnings',
    icon: <Heart />,
  },
  {
    value: 'general' as const,
    label: 'General Board',
    description: 'For any other occasion',
    icon: <Gem />,
  },
];

const nameTypeOptions = [
  {
    value: 'first-name' as const,
    label: 'First Name Only',
    description: 'Use just the first name (e.g., "John")',
  },
  {
    value: 'full-name' as const,
    label: 'Full Name',
    description: 'Use the complete name (e.g., "John Smith")',
  },
  {
    value: 'nickname' as const,
    label: 'Nickname',
    description: 'Use a nickname or preferred name (e.g., "Johnny")',
  },
];

function generateTitle(
  boardType: BasicInfoData['boardType'],
  recipientName: string,
  nameType: BasicInfoData['nameType']
): string {
  if (!recipientName.trim()) return '';

  let formattedName = recipientName.trim();
  if (nameType === 'first-name') {
    formattedName = recipientName.split(' ')[0];
  }

  switch (boardType) {
    case 'appreciation':
      return `Appreciation Board for ${formattedName}`;
    case 'birthday':
      return `Happy Birthday ${formattedName}!`;
    case 'farewell':
      return `Farewell ${formattedName}`;
    case 'welcome':
      return `Welcome ${formattedName}!`;
    case 'congratulations':
      return `Congratulations ${formattedName}!`;
    case 'get-well':
      return `Get Well Soon ${formattedName}`;
    case 'sympathy':
      return `In Memory of ${formattedName}`;
    case 'holiday':
      return `Holiday Wishes for ${formattedName}`;
    case 'anniversary':
      return `Celebrating ${formattedName}'s Anniversary`;
    case 'retirement':
      return `Happy Retirement ${formattedName}!`;
    case 'graduation':
      return `Congratulations Graduate ${formattedName}!`;
    case 'baby-shower':
      return `Baby Shower for ${formattedName}`;
    case 'wedding':
      return `Wedding Wishes for ${formattedName}`;
    case 'general':
      return `Board for ${formattedName}`;
    default:
      return `Board for ${formattedName}`;
  }
}

export function BasicInfoStep({
  data,
  onChange,
  onValidationChange,
  errors,
  onFieldTouch,
  touchedFields,
}: BasicInfoStepProps) {
  const [localData, setLocalData] = useState<BasicInfoData>(data);
  const [localErrors, setLocalErrors] =
    useState<Record<string, string>>(errors);

  const validateData = useCallback(
    (dataToValidate: BasicInfoData) => {
      try {
        basicInfoStepSchema.parse(dataToValidate);
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

  const handleFieldChange = useCallback(
    (field: keyof BasicInfoData, value: string) => {
      const updatedData = { ...localData, [field]: value };
      setLocalData(updatedData);
      validateData(updatedData);
      onChange(updatedData);
      onFieldTouch?.(field);
    },
    [onChange, validateData, localData, onFieldTouch]
  );

  const handleBoardTypeSelect = (boardType: BasicInfoData['boardType']) => {
    handleFieldChange('boardType', boardType);
  };

  const handleNameTypeSelect = (nameType: BasicInfoData['nameType']) => {
    handleFieldChange('nameType', nameType);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col gap-4">
        <Label htmlFor="boardType" className="text-sm text-primary">
          What type of board are you creating?
        </Label>
        <Select
          value={localData.boardType}
          onValueChange={(value) =>
            handleBoardTypeSelect(value as BasicInfoData['boardType'])
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a board type" />
          </SelectTrigger>
          <SelectContent>
            {boardTypeOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="group"
              >
                <div className="flex items-center gap-4 py-1">
                  <span className="text-lg text-danke-500 group-focus:text-danke-900">
                    {option.icon}
                  </span>
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground group-focus:text-danke-900">
                      {option.description}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {localErrors.boardType && touchedFields?.has('boardType') && (
          <p className="text-sm text-destructive">{localErrors.boardType}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="recipientName" className="text-sm  text-primary">
          Who is this board for?
        </Label>
        <Input
          id="recipientName"
          type="text"
          placeholder="Enter the recipient's name"
          value={localData.recipientName}
          onChange={(e) => handleFieldChange('recipientName', e.target.value)}
          error={!!localErrors.recipientName}
          className="text-sm"
        />
        {localErrors.recipientName && touchedFields?.has('recipientName') && (
          <p className="text-sm text-destructive">
            {localErrors.recipientName}
          </p>
        )}
      </div>

      {localData.recipientName && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="nameType" className="text-sm text-primary">
            How should we display their name?
          </Label>
          <Select
            value={localData.nameType}
            onValueChange={(value) =>
              handleNameTypeSelect(value as BasicInfoData['nameType'])
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select name display type" />
            </SelectTrigger>
            <SelectContent>
              {nameTypeOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="group"
                >
                  <div className="flex flex-col items-start gap-1 p-1">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground group-focus:text-danke-900">
                      {option.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {localErrors.nameType && touchedFields?.has('nameType') && (
            <p className="text-sm text-destructive">{localErrors.nameType}</p>
          )}
        </div>
      )}

      {localData.boardType && localData.recipientName && localData.nameType && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-sm text-primary">
            Board Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Board title will be generated automatically"
            value={localData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            error={!!localErrors.title}
            className="text-sm"
          />
          <p className="text-sm text-muted-foreground">
            The title is automatically generated based on your selections, but
            you can customize it.
          </p>
          {localErrors.title && touchedFields?.has('title') && (
            <p className="text-sm text-destructive">{localErrors.title}</p>
          )}
        </div>
      )}
    </div>
  );
}
