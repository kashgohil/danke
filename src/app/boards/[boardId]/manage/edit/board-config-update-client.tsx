'use client';

import { BoardConfigUpdate } from '@/components/boards/board-config-update';
import { Board } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BoardConfigUpdateClientProps {
  board: Board;
}

export function BoardConfigUpdateClient({
  board,
}: BoardConfigUpdateClientProps) {
  const router = useRouter();
  const [currentBoard, setCurrentBoard] = useState(board);

  const handleUpdate = (updatedBoard: Board) => {
    setCurrentBoard(updatedBoard);
    setTimeout(() => {
      router.push(`/boards/${board.id}/manage?updated=true`);
    }, 1000);
  };

  const handleCancel = () => {
    router.push(`/boards/${board.id}/manage`);
  };

  return (
    <BoardConfigUpdate
      board={currentBoard}
      onUpdate={handleUpdate}
      onCancel={handleCancel}
    />
  );
}
