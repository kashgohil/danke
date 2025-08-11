import { ModeratorModel } from '@/lib/models/moderator';
import { tryCatch } from '@/lib/try-catch';
import { ModeratorManagement } from './moderator-management';

interface Moderator {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  addedAt: Date;
  addedByName: string;
}

interface BoardManageModeratorsProps {
  boardId: string;
}

export async function BoardManageModerators({
  boardId,
}: BoardManageModeratorsProps) {
  const { result: moderators, error } = await tryCatch(
    ModeratorModel.getBoardModerators(boardId)
  );

  if (error) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-muted/50 rounded-lg"></div>
      </div>
    );
  }

  return <ModeratorManagement boardId={boardId} moderators={moderators} />;
}
