import { ModeratorModel } from "@/lib/models/moderator";
import { tryCatch } from "@/lib/try-catch";
import { Pin } from "lucide-react";
import { ModeratorManagement } from "./moderator-management";

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
    ModeratorModel.getBoardModerators(boardId),
  );

  if (error) {
    return (
      <div className="animate-pulse">
        <div className="relative h-64 bg-white border-4 border-gray-900 rounded-sm shadow-2xl">
          <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
            <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  return <ModeratorManagement boardId={boardId} moderators={moderators} />;
}
