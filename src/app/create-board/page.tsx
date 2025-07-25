import { BoardCreationForm } from '@/components/boards/board-creation-form';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CreateBoardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in?redirect_url=/create-board');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Board</h1>
          <p className="mt-2 text-gray-600">
            Start collecting appreciation messages for someone special
          </p>
        </div>

        <BoardCreationForm />
      </div>
    </div>
  );
}
