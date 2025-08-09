import { Button } from '@/components/ui/button';
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
import { Board } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Globe, LayoutDashboard, Lock, Save, StickyNote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BoardConfigUpdateProps {
  board: Board;
}

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

const backgroundColorOptions = [
  { value: '#3B82F6', label: 'Blue', color: 'bg-blue-500' },
  { value: '#10B981', label: 'Green', color: 'bg-green-500' },
  { value: '#F59E0B', label: 'Yellow', color: 'bg-yellow-500' },
  { value: '#EF4444', label: 'Red', color: 'bg-red-500' },
  { value: '#8B5CF6', label: 'Purple', color: 'bg-purple-500' },
  { value: '#F97316', label: 'Orange', color: 'bg-orange-500' },
  { value: '#06B6D4', label: 'Cyan', color: 'bg-cyan-500' },
  { value: '#84CC16', label: 'Lime', color: 'bg-lime-500' },
];

export function BoardConfigUpdate({ board }: BoardConfigUpdateProps) {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [title, setTitle] = useState(board.title);
  const [recipientName, setRecipientName] = useState(board.recipientName);
  const [postingMode, setPostingMode] = useState(
    board.postingMode as 'single' | 'multiple'
  );
  const [moderationEnabled, setModerationEnabled] = useState(
    board.moderationEnabled
  );
  const [allowAnonymous, setAllowAnonymous] = useState(board.allowAnonymous);
  const [maxPostsPerUser, setMaxPostsPerUser] = useState(
    board.maxPostsPerUser?.toString() || ''
  );
  const [boardVisibility, setBoardVisibility] = useState(
    board.boardVisibility as 'public' | 'private'
  );
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    board.expirationDate ? new Date(board.expirationDate) : undefined
  );
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    (board.typeConfig as any)?.backgroundColor || undefined
  );

  const handleMaxPostsChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setMaxPostsPerUser(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const updateData = {
        title,
        recipientName,
        boardType: board.boardType,
        postingMode,
        moderationEnabled,
        allowAnonymous,
        maxPostsPerUser: maxPostsPerUser,
        boardVisibility,
        expirationDate,
        typeConfig: {
          ...((board.typeConfig as any) || {}),
          backgroundColor,
        },
      };

      const response = await fetch(`/api/boards/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.details) {
          // Handle validation errors
          const fieldErrors: Record<string, string> = {};
          errorData.details.forEach((error: any) => {
            if (error.path && error.path.length > 0) {
              fieldErrors[error.path[0]] = error.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          throw new Error(errorData.error || 'Failed to update board');
        }
        return;
      }

      const result = await response.json();
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/boards/${result.board.id}/manage?updated=true`);
      }, 1500);
    } catch (error) {
      console.error('Error updating board:', error);
      setErrors({
        general:
          error instanceof Error ? error.message : 'Failed to update board',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-danke-900">
          Update Board Configuration
        </h2>
        <p className="text-danke-900">
          Modify your board settings and preferences
        </p>
      </div>

      {errors.general && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
          <p className="text-destructive text-sm">{errors.general}</p>
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800 text-sm font-medium">
            ✅ Board configuration updated successfully! Redirecting...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSuccess && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                Updating board configuration...
              </p>
            </div>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-0 text-primary">
              Basic Information
            </CardTitle>
            <CardDescription>
              Update the basic details of your board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-primary">
                Board Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter board title"
                error={!!errors.title}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="recipientName" className="text-primary">
                Recipient Name
              </Label>
              <Input
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient name"
                error={!!errors.recipientName}
              />
              {errors.recipientName && (
                <p className="text-sm text-destructive">
                  {errors.recipientName}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-0 text-primary">
              Posting Configuration
            </CardTitle>
            <CardDescription>
              Configure how people can post to your board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-primary">Posting Mode</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postingModeOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      postingMode === option.value
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:border-primary/50'
                    )}
                    onClick={() => setPostingMode(option.value)}
                  >
                    <CardHeader className="p-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="p-1 mb-2 text-primary">
                          {option.icon}
                        </span>
                        <CardTitle className="text-lg">
                          {option.label}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {option.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {postingMode === 'multiple' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxPostsPerUser" className="text-primary">
                  Maximum Posts Per User (Optional)
                </Label>
                <Input
                  id="maxPostsPerUser"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="No limit"
                  value={maxPostsPerUser}
                  onChange={(e) => handleMaxPostsChange(e.target.value)}
                  error={!!errors.maxPostsPerUser}
                  className="max-w-xs"
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty for no limit. Maximum allowed is 50 posts per
                  user.
                </p>
                {errors.maxPostsPerUser && (
                  <p className="text-sm text-destructive">
                    {errors.maxPostsPerUser}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-0 text-primary">
              Board Settings
            </CardTitle>
            <CardDescription>
              Configure additional board options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={cn(
                  'cursor-pointer transition-all hover:shadow-sm',
                  moderationEnabled
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-primary/50'
                )}
                onClick={() => setModerationEnabled(!moderationEnabled)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                        moderationEnabled
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      )}
                    >
                      {moderationEnabled && (
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
                        Review posts before they appear on board
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  'cursor-pointer transition-all hover:shadow-sm',
                  allowAnonymous
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-primary/50'
                )}
                onClick={() => setAllowAnonymous(!allowAnonymous)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center mt-1',
                        allowAnonymous
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      )}
                    >
                      {allowAnonymous && (
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
                        Let users post without revealing their identity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-0 text-primary">
              Visibility Settings
            </CardTitle>
            <CardDescription>Control who can view your board</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-primary">Board Visibility</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibilityOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      boardVisibility === option.value
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:border-primary/50'
                    )}
                    onClick={() => setBoardVisibility(option.value)}
                  >
                    <CardHeader>
                      <div className="flex flex-col items-center gap-1">
                        <span className="p-1 mb-2 text-primary">
                          {option.icon}
                        </span>
                        <CardTitle className="text-lg">
                          {option.label}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {option.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-0 text-primary">
              Expiration Settings
            </CardTitle>
            <CardDescription>
              Set when this board should become read-only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="expirationDate" className="text-primary">
                  Board Expiration (Optional)
                </Label>
                <DateTimePicker
                  date={expirationDate}
                  onDateTimeChange={setExpirationDate}
                  placeholder="Select expiration date and time"
                  error={!!errors.expirationDate}
                  className="w-fit"
                  min={new Date().toISOString().slice(0, 16)}
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty for no expiration. Board will automatically become
                  read-only after this date.
                </p>
                {errors.expirationDate && (
                  <p className="text-sm text-destructive">
                    {errors.expirationDate}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-0 text-primary">
              Theme Settings
            </CardTitle>
            <CardDescription>
              Customize the visual appearance of your board
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label className="text-primary">
                  Background Color (Optional)
                </Label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {backgroundColorOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        'cursor-pointer rounded-lg transition-all hover:scale-105',
                        backgroundColor === option.value
                          ? 'ring-2 ring-offset-2 ring-primary'
                          : ''
                      )}
                      onClick={() => setBackgroundColor(option.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setBackgroundColor(option.value);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={backgroundColor === option.value}
                      aria-label={`Select ${option.label} background color`}
                    >
                      <div
                        className={cn('w-full h-12 rounded-lg', option.color)}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBackgroundColor(undefined)}
                    disabled={!backgroundColor}
                  >
                    Clear Color
                  </Button>
                  {backgroundColor && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div
                        className="w-4 h-4 rounded border border-border"
                        style={{ backgroundColor }}
                      />
                      <span>{backgroundColor}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose a background color theme for your board. This will
                  create a beautiful gradient background.
                </p>
                {errors.backgroundColor && (
                  <p className="text-sm text-destructive">
                    {errors.backgroundColor}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading || isSuccess}
            onClick={() => router.push(`/boards/${board.id}/manage`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={isLoading || isSuccess}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSuccess
              ? 'Updated!'
              : isLoading
              ? 'Updating...'
              : 'Update Board'}
          </Button>
        </div>
      </form>
    </div>
  );
}
