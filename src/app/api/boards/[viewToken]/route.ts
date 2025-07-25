import { BoardModel } from '@/lib/models/board';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { viewToken: string } }
) {
  try {
    const { viewToken } = params;

    if (!viewToken) {
      return NextResponse.json(
        { error: 'View token is required' },
        { status: 400 }
      );
    }

    const board = await BoardModel.getByViewToken(viewToken);

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    // TODO: In future tasks, we'll also fetch posts for this board
    // For now, we'll return the board with an empty posts array
    const response = {
      board: {
        id: board.id,
        title: board.title,
        recipientName: board.recipientName,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      },
      posts: [], // Will be populated in future tasks
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching board:', error);
    return NextResponse.json(
      { error: 'Failed to fetch board' },
      { status: 500 }
    );
  }
}
