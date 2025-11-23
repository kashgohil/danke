'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/api-error-handler';
import { tryCatch } from '@/lib/try-catch';
import { Info, Mail, Shield, Trash2, UserPlus } from 'lucide-react';
import { useCallback, useState } from 'react';

interface Moderator {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  addedAt: Date;
  addedByName: string;
}

interface ModeratorManagementProps {
  boardId: string;
  moderators: Moderator[];
}

export function ModeratorManagement({
  boardId,
  moderators: propModerators,
}: ModeratorManagementProps) {
  const [moderators, setModerators] = useState(propModerators);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newModeratorEmail, setNewModeratorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onModeratorsChange = useCallback(async () => {
    const { result: response, error } = await tryCatch(
      apiRequest(`/api/boards/${boardId}/moderators`)
    );
    if (error) {
      console.error('something went wrong while fetching moderators');
      return;
    }

    setModerators(response.moderators || []);
  }, []);

  const handleAddModerator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModeratorEmail.trim()) return;

    setIsLoading(true);
    const { result: response, error } = await tryCatch(
      apiRequest(`/api/boards/${boardId}/moderators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newModeratorEmail.trim(),
        }),
      })
    );

    if (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to add moderator',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: 'Moderator Added',
      description: `${newModeratorEmail} has been added as a moderator.`,
    });

    setNewModeratorEmail('');
    setIsAddDialogOpen(false);
    onModeratorsChange();

    setIsLoading(false);
  };

  const handleRemoveModerator = async (moderator: Moderator) => {
    if (
      !confirm(
        `Are you sure you want to remove ${moderator.userName} as a moderator?`
      )
    ) {
      return;
    }

    setIsLoading(true);
    const { result: response, error } = await tryCatch(
      apiRequest(`/api/boards/${boardId}/moderators/${moderator.userId}`, {
        method: 'DELETE',
      })
    );

    if (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to remove moderator',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: 'Moderator Removed',
      description: `${moderator.userName} has been removed as a moderator.`,
    });

    onModeratorsChange();
    setIsLoading(false);
  };

  return (
    <Card className="bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg z-1">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-danke-900" />
        </div>
        <CardTitle className="text-xl text-foreground">
          Board Moderators
        </CardTitle>
        <CardDescription className="text-muted-foreground flex items-center justify-center gap-2">
          Manage who can moderate posts on your board
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="flex flex-col gap-2 text-left p-2">
                  <span className="font-medium text-primary">
                    Moderator Permissions:
                  </span>
                  <ul className="text-xs space-y-1">
                    <li>• View posts on private boards</li>
                    <li>• Request content changes from post authors</li>
                    <li>• Schedule posts for deletion with deadlines</li>
                    <li>• Delete posts directly</li>
                  </ul>
                  <p className="text-xs font-medium text-muted-foreground">
                    Moderators cannot update board settings or delete the board.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mx-auto">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Moderator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="gap-4">
                <DialogTitle>Add Moderator</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you want to add as a
                  moderator. They must have an account on the platform.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddModerator} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="moderator@example.com"
                    value={newModeratorEmail}
                    onChange={(e) => setNewModeratorEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Moderator'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {moderators.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No moderators added yet</p>
            <p className="text-sm">Add moderators to help manage your board</p>
          </div>
        ) : (
          <div className="space-y-3">
            {moderators.map((moderator) => (
              <div
                key={moderator.id}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
              >
                <div className="flex items-center flex-1 gap-3">
                  <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-danke-900" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-primary">
                      {moderator.userName}
                    </p>
                    <p className="text-sm text-muted-foreground gap-1 flex items-center">
                      {moderator.userEmail}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p className="text-xs text-muted-foreground">
                              Added{' '}
                              {new Date(moderator.addedAt).toLocaleDateString()}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={isLoading}
                  onClick={() => handleRemoveModerator(moderator)}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sm:inline hidden">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
