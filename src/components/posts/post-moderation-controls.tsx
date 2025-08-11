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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/api-error-handler';
import { tryCatch } from '@/lib/try-catch';
import {
  AlertTriangle,
  Calendar,
  MessageSquare,
  Shield,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface PostModerationControlsProps {
  postId: string;
  onModerationComplete: () => void;
}

export function PostModerationControls({
  postId,
  onModerationComplete,
}: PostModerationControlsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [deleteDate, setDeleteDate] = useState('');
  const { toast } = useToast();

  const handleModeration = async (
    action: 'request_change' | 'schedule_deletion' | 'delete'
  ) => {
    if (!reason.trim()) {
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
          reason: reason.trim(),
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
      case 'request_change':
        message = 'Content change request sent to the post author.';
        break;
      case 'schedule_deletion':
        message = `Post scheduled for deletion on ${new Date(
          deleteDate
        ).toLocaleDateString()}.`;
        break;
      case 'delete':
        message = 'Post has been deleted.';
        break;
    }

    setActiveDialog(null);
    setReason('');
    setDeleteDate('');
    onModerationComplete();

    setIsLoading(false);

    toast({
      title: 'Success',
      description: message,
    });
  };

  const resetForm = () => {
    setReason('');
    setDeleteDate('');
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border/50">
      <Shield className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-muted-foreground">
        Moderator Actions:
      </span>

      <Dialog
        open={activeDialog === 'request_change'}
        onOpenChange={(open) => {
          setActiveDialog(open ? 'request_change' : null);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-1" />
            Request Change
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Content Change</DialogTitle>
            <DialogDescription>
              Ask the post author to modify their content. They will be notified
              of your request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="change-reason">Reason for change request</Label>
              <Textarea
                id="change-reason"
                placeholder="Please explain what needs to be changed and why..."
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
                onClick={() => handleModeration('request_change')}
                disabled={isLoading || !reason.trim()}
              >
                {isLoading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === 'schedule_deletion'}
        onOpenChange={(open) => {
          setActiveDialog(open ? 'schedule_deletion' : null);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-1" />
            Schedule Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Post Deletion</DialogTitle>
            <DialogDescription>
              Set a deadline for the author to update their post. If not updated
              by this date, the post will be automatically deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="delete-date">Delete date</Label>
              <Input
                id="delete-date"
                type="datetime-local"
                value={deleteDate}
                onChange={(e) => setDeleteDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div>
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

      <Dialog
        open={activeDialog === 'delete'}
        onOpenChange={(open) => {
          setActiveDialog(open ? 'delete' : null);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              This will permanently delete the post. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-sm text-destructive font-medium">
                This action is permanent and cannot be undone.
              </span>
            </div>
            <div>
              <Label htmlFor="delete-reason">Reason for deletion</Label>
              <Textarea
                id="delete-reason"
                placeholder="Explain why this post is being deleted..."
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
    </div>
  );
}
