"use client";

import { BasicInfoStep } from "@/components/boards/basic-info-step";
import { BoardConfigStep } from "@/components/boards/board-config-step";
import { NavigationControls } from "@/components/boards/navigation-controls";
import { TypeConfigStep } from "@/components/boards/type-config-step";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { apiRequest, useApiErrorHandler } from "@/lib/api-error-handler";
import { Board } from "@/lib/db";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const STEPS = [
  {
    title: "Basic Info",
    description: "Name your board and choose the occasion",
  },
  { title: "Customize", description: "Personalize for your recipient" },
  { title: "Settings", description: "Configure privacy and moderation" },
];

export function CreateBoardClient() {
  const router = useRouter();
  const { handleError } = useApiErrorHandler();

  const [isCreating, setIsCreating] = useState(false);

  const {
    currentStep,
    stepData,
    isSubmitting,
    submitError,
    errors,
    isValid,
    touchedFields,
    nextStep,
    prevStep,
    canGoNext,
    canGoBack,
    updateBasicInfo,
    updateTypeConfig,
    updateBoardConfig,
    validateAllSteps,
    setSubmitting,
    setSubmitError,
  } = useMultiStepForm();

  const onSuccess = useCallback((board: Board) => {
    setIsCreating(false);
    // Navigate to the board management page
    router.push(`/boards/${board.id}/manage`);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      setIsCreating(true);

      const isValid = validateAllSteps();
      if (!isValid) {
        setSubmitError("Please fix all validation errors before submitting.");
        return;
      }

      const submissionData = {
        // Basic info
        title: stepData.basicInfo.title || "",
        recipientName: stepData.basicInfo.recipientName,
        boardType: stepData.basicInfo.boardType,

        // Board configuration
        postingMode: stepData.boardConfig.postingMode,
        moderationEnabled: stepData.boardConfig.moderationEnabled,
        allowAnonymous: stepData.boardConfig.allowAnonymous,
        maxPostsPerUser:
          stepData.boardConfig.maxPostsPerUser?.toString() || null,
        boardVisibility: stepData.boardConfig.boardVisibility,
        expirationDate: stepData.boardConfig.expirationDate
          ? stepData.boardConfig.expirationDate
          : undefined,

        // Type-specific configuration
        typeConfig: stepData.typeConfig as Record<string, unknown>,
      };

      const result = await apiRequest("/api/boards", {
        method: "POST",
        body: JSON.stringify(submissionData),
      });

      const board = result.data;

      if (!board) {
        throw new Error("No board data received from server");
      }

      onSuccess(board);
    } catch (error) {
      const errorMessage = handleError(error);
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [stepData, validateAllSteps, setSubmitting, setSubmitError, onSuccess]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            data={stepData.basicInfo as any}
            onChange={updateBasicInfo}
            errors={errors.basicInfo}
            touchedFields={touchedFields.basicInfo}
          />
        );
      case 1:
        return (
          <TypeConfigStep
            boardType={stepData.basicInfo.boardType as any}
            data={stepData.typeConfig as any}
            onChange={updateTypeConfig}
            errors={errors.typeConfig}
            touchedFields={touchedFields.typeConfig}
          />
        );
      case 2:
        return (
          <BoardConfigStep
            data={stepData.boardConfig as any}
            onChange={updateBoardConfig}
            errors={errors.boardConfig}
            touchedFields={touchedFields.boardConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error("MultiStepBoardCreationForm error:", error, errorInfo);
      }}
    >
      <div
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{
          backgroundColor: "#FDF6E3",
          backgroundImage: `
					radial-gradient(circle, #E8DCC4 1px, transparent 1px),
					radial-gradient(circle, #F0E6D2 1px, transparent 1px)
				`,
          backgroundSize: "24px 24px, 48px 48px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      >
        <div className="container-default w-full section-padding pt-50 pb-16">
          {/* Header */}
          <div className="text-center mb-12 animate-in">
            <h1 className="mb-4 text-4xl text-gray-900 font-fuzzy-bubbles">
              Create Your Board
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Set up a personalized appreciation board in just a few steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12 animate-in-delay-1">
            <div className="flex items-center justify-between relative">
              {STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`
												w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm
												transition-all duration-300 shadow-sm
												${
                          isCompleted
                            ? "bg-gray-900 text-white border-2 border-gray-900 scale-110"
                            : isCurrent
                              ? "bg-[#FDF6E3] border-2 border-gray-900 text-gray-900 scale-110"
                              : "bg-white border border-gray-300 text-black"
                        }
											`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p
                        className={`text-lg font-bold transition-colors ${
                          isCurrent ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-4 border-gray-900 rounded-sm p-8 md:p-12 shadow-2xl animate-in-delay-2">
              {/* Error Message */}
              {submitError && (
                <div className="mb-8 rounded-sm p-6 bg-rose-50 border-4 border-gray-900 animate-in">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-gray-900 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-rose-900 mb-1">
                        Error Creating Board
                      </h3>
                      <p className="text-sm text-rose-800">{submitError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="flex-shrink-0 text-rose-500 hover:text-rose-700 transition-colors"
                    >
                      <span className="sr-only">Dismiss</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="mb-8">{renderStepContent()}</div>

              {/* Navigation */}
              <NavigationControls
                currentStep={currentStep}
                totalSteps={3}
                isValid={isValid}
                canGoNext={canGoNext}
                canGoBack={canGoBack}
                isSubmitting={isSubmitting}
                onNext={nextStep}
                onBack={prevStep}
                onSubmit={handleSubmit}
              />

              {/* Cancel Link */}
              <div className="text-center pt-6 border-t-4 border-gray-900 mt-8">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  disabled={isSubmitting}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel and return home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Creating Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center animate-in">
            <div className="bg-white rounded-sm p-10 shadow-2xl max-w-md mx-4 animate-scale-in border-4 border-gray-900">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6 shadow-lg">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Creating Your Board
                </h3>
                <p className="text-gray-600">
                  Please wait while we set up your beautiful appreciation
                  board...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
