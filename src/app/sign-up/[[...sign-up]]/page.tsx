import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Appreciation Board
          </h1>
          <p className="text-gray-600">
            Create your account to start building appreciation boards
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
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
