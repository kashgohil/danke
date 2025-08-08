import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-danke-900 mb-2">Join Danke</h1>
          <p className="text-danke-800">
            Create your account to start building appreciation boards
          </p>
        </div>
        <div className="rounded-lg p-6">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-green-600 hover:bg-green-700 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'border-gray-200 hover:bg-gray-50 text-gray-600',
                formFieldInput:
                  'border-gray-300 focus:border-green-500 focus:ring-green-500',
                footerActionLink: 'text-green-600 hover:text-green-700',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
