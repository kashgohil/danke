'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/api-error-handler';
import { tryCatch } from '@/lib/try-catch';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  MessageSquare,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { DateTimePicker } from '../ui/datetime-picker';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface PostModerationControlsProps {
  postId: string;
  moderationStatus?: string;
  textColors: {
    muted: string;
    accent: string;
    primary: string;
    secondary: string;
  };
  onModerationComplete: () => void;
}

export function PostModerationControls({
  postId,
  moderationStatus,
  textColors,
  onModerationComplete,
}: PostModerationControlsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [deleteDate, setDeleteDate] = useState<Date>();
  const { toast } = useToast();

  const handleModeration = async (
    action: 'approve' | 'request_change' | 'schedule_deletion' | 'delete'
  ) => {
    if (action !== 'approve' && !reason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for this action.',
        variant: 'destructive',
      });
      return;
    }

    if (action === 'schedule_deletion' && !deleteDate) {
      toast({
        title: 'Date Required',
        description: 'Please select a delete date.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const { result: response, error } = await tryCatch(
      apiRequest(`/api/posts/${postId}/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          reason: action === 'approve' ? undefined : reason.trim(),
          deleteDate: deleteDate || undefined,
        }),
      })
    );

    if (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to moderate post',
        variant: 'destructive',
      });
      return;
    }

    let message = '';
    switch (action) {
      case 'approve':
        message = 'Post has been approved and is now visible.';
        break;
      case 'request_change':
        message = 'Content change request sent to the post author.';
        break;
      case 'schedule_deletion':
        message = `Post scheduled for deletion on ${deleteDate?.toLocaleDateString()}.`;
        break;
      case 'delete':
        message = 'Post has been deleted.';
        break;
    }

    setActiveDialog(null);
    setReason('');
    setDeleteDate(undefined);
    onModerationComplete();

    setIsLoading(false);

    toast({
      title: 'Success',
      description: message,
    });
  };

  const resetForm = () => {
    setReason('');
    setDeleteDate(undefined);
  };

  function requestContentChange() {
    return (
      <Dialog
        open={activeDialog === 'request_change'}
        onOpenChange={(open) => {
          setActiveDialog(open ? 'request_change' : null);
          if (!open) resetForm();
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={`h-8 w-8 p-0 ${textColors.muted} hover:${textColors.primary} hover:bg-gray-100/50 rounded-full transition-all duration-200`}
                  size="sm"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Request Change</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent>
          <DialogHeader className="gap-4">
            <DialogTitle>Request Content Change</DialogTitle>
            <DialogDescription>
              Ask the post author to modify their content. They will be notified
              of your request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              id="change-reason"
              placeholder="Please explain what needs to be changed and why..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleModeration('request_change')}
                disabled={isLoading || !reason.trim()}
              >
                {isLoading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function scheduleDeletion() {
    return (
      <Dialog
        open={activeDialog === 'schedule_deletion'}
        onOpenChange={(open) => {
          setActiveDialog(open ? 'schedule_deletion' : null);
          if (!open) resetForm();
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${textColors.muted} hover:${textColors.primary} hover:bg-gray-100/50 rounded-full transition-all duration-200`}
                >
                  <Calendar className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Schedule Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent>
          <DialogHeader className="gap-4">
            <DialogTitle>Schedule Post Deletion</DialogTitle>
            <DialogDescription>
              Set a deadline for the author to update their post. If not updated
              by this date, the post will be automatically deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <DateTimePicker
              date={deleteDate}
              onDateTimeChange={setDeleteDate}
              placeholder="Select expiration date and time"
              className="text-sm w-fit border border-border rounded-lg"
              min={new Date().toISOString().slice(0, 16)}
            />
            <div className="flex flex-col gap-3">
              <Label htmlFor="schedule-reason">
                Reason for scheduling deletion
              </Label>
              <Textarea
                id="schedule-reason"
                placeholder="Explain why this post needs to be updated or will be deleted..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleModeration('schedule_deletion')}
                disabled={isLoading || !reason.trim() || !deleteDate}
              >
                {isLoading ? 'Scheduling...' : 'Schedule Deletion'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function deletePost() {
    return (
      <Dialog
        open={activeDialog === 'delete'}
        onOpenChange={(open) => {
          setActiveDialog(open ? 'delete' : null);
          if (!open) resetForm();
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  className={`h-8 w-8 p-0 ${textColors.muted} hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200`}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent>
          <DialogHeader className="gap-4">
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              This will permanently delete the post. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-primary/80 rounded-lg text-danke-900">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">
                This action is permanent and cannot be undone.
              </span>
            </div>
            <Textarea
              id="delete-reason"
              placeholder="Explain why this post is being deleted..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleModeration('delete')}
                disabled={isLoading || !reason.trim()}
              >
                {isLoading ? 'Deleting...' : 'Delete Post'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function approvePost() {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${textColors.muted} hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200`}
              onClick={() => handleModeration('approve')}
              disabled={isLoading}
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Approve Post</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {moderationStatus !== 'approved' && approvePost()}
      {requestContentChange()}
      {scheduleDeletion()}
      {deletePost()}
    </div>
  );
}
