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
import { useCallback } from 'react';

interface BasicInfoStepProps {
  data: BasicInfoData;
  onChange: (data: Partial<BasicInfoData>) => void;
  errors: Record<string, string>;
  touchedFields: Set<string>;
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

function generateTitle(
  boardType: BasicInfoData['boardType'],
  recipientName: string
): string {
  if (!recipientName.trim()) return '';

  const formattedName = recipientName.trim();

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
  errors,
  touchedFields,
}: BasicInfoStepProps) {
  const handleFieldChange = useCallback(
    (field: keyof BasicInfoData, value: string) => {
      let updatedData = { ...data, [field]: value };

      if (field === 'recipientName') {
        updatedData.title = generateTitle(
          updatedData.boardType,
          updatedData.recipientName
        );
      }

      onChange(updatedData);
    },
    [onChange, data]
  );

  const handleBoardTypeSelect = (boardType: BasicInfoData['boardType']) => {
    handleFieldChange('boardType', boardType);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col gap-4">
        <Label htmlFor="boardType" className="text-sm text-primary">
          What type of board are you creating?
        </Label>
        <Select
          value={data.boardType}
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
        {errors.boardType && touchedFields.has('boardType') && (
          <p className="text-sm text-destructive">{errors.boardType}</p>
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
          value={data.recipientName}
          onChange={(e) => handleFieldChange('recipientName', e.target.value)}
          error={touchedFields.has('recipientName') && !!errors.recipientName}
          className="text-sm"
        />
        {errors.recipientName && touchedFields.has('recipientName') && (
          <p className="text-sm text-destructive">{errors.recipientName}</p>
        )}
      </div>

      {data.boardType && data.recipientName && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-sm text-primary">
            Board Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Board title will be generated automatically"
            value={data.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            error={touchedFields.has('title') && !!errors.title}
            className="text-sm"
          />
          <p className="text-sm text-muted-foreground">
            The title is automatically generated based on your selections, but
            you can customize it.
          </p>
          {errors.title && touchedFields.has('title') && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
        </div>
      )}
    </div>
  );
}
