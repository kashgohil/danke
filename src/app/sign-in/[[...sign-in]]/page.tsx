import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-danke-900 my-2">
            Welcome Back
          </h1>
          <p className="text-danke-800">Sign in to your Danke account</p>
        </div>
        <div className="rounded-lg p-6">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'border-gray-200 hover:bg-gray-50 text-gray-600',
                formFieldInput:
                  'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                footerActionLink: 'text-blue-600 hover:text-blue-700',
              },
            }}
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
