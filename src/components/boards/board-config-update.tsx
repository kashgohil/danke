"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Board } from "@/lib/db";
import { cn } from "@/lib/utils";
import {
  Check,
  Globe,
  LayoutDashboard,
  Lock,
  Pin,
  Save,
  StickyNote,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

interface BoardConfigUpdateProps {
  board: Board;
}

const postingModeOptions = [
  {
    value: "single" as const,
    label: "Single Post",
    description: "one post per contributor",
    icon: <StickyNote className="h-8 w-8 text-gray-900" />,
  },
  {
    value: "multiple" as const,
    label: "Multiple Posts",
    description: "multiple posts per contributor",
    icon: <LayoutDashboard className="h-8 w-8 text-gray-900" />,
  },
];

const visibilityOptions = [
  {
    value: "public" as const,
    label: "Public Board",
    description: "Anyone with the link can view the board",
    icon: <Globe className="h-8 w-8 text-gray-900" />,
  },
  {
    value: "private" as const,
    label: "Private Board",
    description: "Only people you invite can view the board",
    icon: <Lock className="h-8 w-8 text-gray-900" />,
  },
];

const backgroundColorOptions = [
  { value: "#2563EB", label: "Blue", color: "bg-blue-600" },
  { value: "#059669", label: "Green", color: "bg-green-600" },
  { value: "#D97706", label: "Amber", color: "bg-amber-600" },
  { value: "#DC2626", label: "Red", color: "bg-red-600" },
  { value: "#7C3AED", label: "Purple", color: "bg-purple-600" },
  { value: "#0D9488", label: "Teal", color: "bg-teal-600" },
  { value: "#0284C7", label: "Sky", color: "bg-sky-600" },
  { value: "#65A30D", label: "Lime", color: "bg-lime-600" },
  { value: "#DB2777", label: "Pink", color: "bg-pink-600" },
  { value: "#EA580C", label: "Orange", color: "bg-orange-600" },
];

// Email/Domain input component
function EmailDomainInput({
  value,
  onChange,
  placeholder,
  type,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  type: "email" | "domain";
}) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const removeItem = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addItem}
        placeholder={placeholder}
        className="text-sm border-2 border-gray-900 rounded-sm bg-white focus-visible:ring-gray-900/20"
      />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <div
              key={item}
              className="flex items-center gap-1 px-2 py-1 bg-[#FDF6E3] text-gray-900 rounded-sm text-xs border-2 border-gray-900"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="hover:bg-white/60 rounded-sm p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ConfigCardProps {
  children: ReactNode;
  className?: string;
}

function ConfigCard({ children, className }: ConfigCardProps) {
  return (
    <Card
      className={cn(
        "relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl",
        className,
      )}
    >
      <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
        <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
      </div>
      {children}
    </Card>
  );
}

export function BoardConfigUpdate({ board }: BoardConfigUpdateProps) {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [title, setTitle] = useState(board.title);
  const [recipientName, setRecipientName] = useState(board.recipientName);
  const [postingMode, setPostingMode] = useState(
    board.postingMode as "single" | "multiple",
  );
  const [moderationEnabled, setModerationEnabled] = useState(
    board.moderationEnabled,
  );
  const [allowAnonymous, setAllowAnonymous] = useState(board.allowAnonymous);
  const [maxPostsPerUser, setMaxPostsPerUser] = useState(
    board.maxPostsPerUser?.toString() || "",
  );
  const [boardVisibility, setBoardVisibility] = useState(
    board.boardVisibility as "public" | "private",
  );
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    board.expirationDate ? new Date(board.expirationDate) : undefined,
  );
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    (board.typeConfig as any)?.backgroundColor || undefined,
  );
  const [allowedDomains, setAllowedDomains] = useState<string[]>(
    board.allowedDomains || [],
  );
  const [blockedDomains, setBlockedDomains] = useState<string[]>(
    board.blockedDomains || [],
  );
  const [allowedEmails, setAllowedEmails] = useState<string[]>(
    board.allowedEmails || [],
  );
  const [blockedEmails, setBlockedEmails] = useState<string[]>(
    board.blockedEmails || [],
  );

  const handleMaxPostsChange = (value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setMaxPostsPerUser(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const updateData = {
        title,
        recipientName,
        boardType: board.boardType,
        postingMode,
        moderationEnabled,
        allowAnonymous,
        maxPostsPerUser: maxPostsPerUser,
        boardVisibility,
        allowedDomains: allowedDomains.length > 0 ? allowedDomains : undefined,
        blockedDomains: blockedDomains.length > 0 ? blockedDomains : undefined,
        allowedEmails: allowedEmails.length > 0 ? allowedEmails : undefined,
        blockedEmails: blockedEmails.length > 0 ? blockedEmails : undefined,
        expirationDate,
        typeConfig: {
          ...((board.typeConfig as any) || {}),
          backgroundColor,
        },
      };

      const response = await fetch(`/api/boards/${board.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.details) {
          // Handle validation errors
          const fieldErrors: Record<string, string> = {};
          errorData.details.forEach((error: any) => {
            if (error.path && error.path.length > 0) {
              fieldErrors[error.path[0]] = error.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          throw new Error(errorData.error || "Failed to update board");
        }
        return;
      }

      const result = await response.json();
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/boards/${result.board.id}/manage?updated=true`);
      }, 1500);
    } catch (error) {
      console.error("Error updating board:", error);
      setErrors({
        general:
          error instanceof Error ? error.message : "Failed to update board",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {errors.general && (
        <div className="bg-rose-50 border-2 border-rose-500 rounded-sm p-4">
          <p className="text-rose-700 text-sm">{errors.general}</p>
        </div>
      )}

      {isSuccess && (
        <div className="bg-[#FDF6E3] border-2 border-gray-900 rounded-sm p-4">
          <p className="text-gray-900 text-sm font-medium flex items-center gap-2">
            <Check className="w-4 h-4" />
            Board configuration updated successfully! Redirecting...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSuccess && (
          <div className="fixed h-full w-full inset-0 bg-[#FDF6E3]/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center bg-white border-4 border-gray-900 rounded-sm shadow-2xl p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">
                Updating board configuration...
              </p>
            </div>
          </div>
        )}
        <ConfigCard>
          <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
            <CardTitle className="text-xl md:text-2xl font-fuzzy-bubbles text-gray-900">
              Basic Information
            </CardTitle>
            <CardDescription className="text-gray-600">
              Update the basic details of your board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 text-black">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="title"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
              >
                Board Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter board title"
                error={!!errors.title}
                className={cn(
                  "border-2 text-base rounded-sm bg-white focus-visible:ring-2",
                  errors.title
                    ? "border-rose-500 focus-visible:ring-rose-200"
                    : "border-gray-900 focus-visible:ring-gray-900/20",
                )}
              />
              {errors.title && (
                <p className="text-xs text-rose-700">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="recipientName"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
              >
                Recipient Name
              </Label>
              <Input
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient name"
                error={!!errors.recipientName}
                className={cn(
                  "border-2 text-base rounded-sm bg-white focus-visible:ring-2",
                  errors.recipientName
                    ? "border-rose-500 focus-visible:ring-rose-200"
                    : "border-gray-900 focus-visible:ring-gray-900/20",
                )}
              />
              {errors.recipientName && (
                <p className="text-xs text-rose-700">{errors.recipientName}</p>
              )}
            </div>
          </CardContent>
        </ConfigCard>

        <ConfigCard>
          <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
            <CardTitle className="text-xl md:text-2xl font-fuzzy-bubbles text-gray-900">
              Posting Configuration
            </CardTitle>
            <CardDescription className="text-gray-600">
              Configure how people can post to your board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                Posting Mode
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postingModeOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={cn(
                      "cursor-pointer transition-all border-2 border-gray-900 rounded-sm bg-white shadow-sm hover:bg-[#FDF6E3]",
                      postingMode === option.value
                        ? "ring-2 ring-gray-900 bg-[#FDF6E3]"
                        : "",
                    )}
                    onClick={() => setPostingMode(option.value)}
                  >
                    <CardHeader className="p-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="p-1 mb-2">{option.icon}</span>
                        <CardTitle className="text-lg text-gray-900">
                          {option.label}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {option.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {postingMode === "multiple" && (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="maxPostsPerUser"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
                >
                  Maximum Posts Per User (Optional)
                </Label>
                <Input
                  id="maxPostsPerUser"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="No limit"
                  value={maxPostsPerUser}
                  onChange={(e) => handleMaxPostsChange(e.target.value)}
                  error={!!errors.maxPostsPerUser}
                  className={cn(
                    "max-w-xs border-2 rounded-sm bg-white focus-visible:ring-2",
                    errors.maxPostsPerUser
                      ? "border-rose-500 focus-visible:ring-rose-200"
                      : "border-gray-900 focus-visible:ring-gray-900/20",
                  )}
                />
                <p className="text-sm text-gray-600">
                  Leave empty for no limit. Maximum allowed is 50 posts per
                  user.
                </p>
                {errors.maxPostsPerUser && (
                  <p className="text-xs text-rose-700">
                    {errors.maxPostsPerUser}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </ConfigCard>

        <ConfigCard>
          <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
            <CardTitle className="text-xl md:text-2xl font-fuzzy-bubbles text-gray-900">
              Board Settings
            </CardTitle>
            <CardDescription className="text-gray-600">
              Configure additional board options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={cn(
                  "cursor-pointer transition-all border-2 border-gray-900 rounded-sm bg-white shadow-sm hover:bg-[#FDF6E3]",
                  moderationEnabled ? "ring-2 ring-gray-900 bg-[#FDF6E3]" : "",
                )}
                onClick={() => setModerationEnabled(!moderationEnabled)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-sm border-2 flex items-center justify-center mt-1",
                        moderationEnabled
                          ? "border-gray-900 bg-gray-900"
                          : "border-gray-900 bg-white",
                      )}
                    >
                      {moderationEnabled && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Enable Moderation
                      </p>
                      <p className="text-sm text-gray-600">
                        Review posts before they appear on board
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer transition-all border-2 border-gray-900 rounded-sm bg-white shadow-sm hover:bg-[#FDF6E3]",
                  allowAnonymous ? "ring-2 ring-gray-900 bg-[#FDF6E3]" : "",
                )}
                onClick={() => setAllowAnonymous(!allowAnonymous)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-sm border-2 flex items-center justify-center mt-1",
                        allowAnonymous
                          ? "border-gray-900 bg-gray-900"
                          : "border-gray-900 bg-white",
                      )}
                    >
                      {allowAnonymous && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Allow Anonymous Posts
                      </p>
                      <p className="text-sm text-gray-600">
                        Let users post without revealing their identity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </ConfigCard>

        <ConfigCard>
          <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
            <CardTitle className="text-xl md:text-2xl font-fuzzy-bubbles text-gray-900">
              Visibility Settings
            </CardTitle>
            <CardDescription className="text-gray-600">
              Control who can view your board
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                Board Visibility
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibilityOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={cn(
                      "cursor-pointer transition-all border-2 border-gray-900 rounded-sm bg-white shadow-sm hover:bg-[#FDF6E3]",
                      boardVisibility === option.value
                        ? "ring-2 ring-gray-900 bg-[#FDF6E3]"
                        : "",
                    )}
                    onClick={() => setBoardVisibility(option.value)}
                  >
                    <CardHeader className="p-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="p-1 mb-2">{option.icon}</span>
                        <CardTitle className="text-lg text-gray-900">
                          {option.label}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {option.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {boardVisibility === "private" && (
              <div className="flex flex-col gap-6 py-6 px-6 border-2 border-gray-900 rounded-sm bg-[#FDF6E3]/60">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                    Access Restrictions
                  </Label>
                  <p className="text-sm text-gray-600">
                    Control who can access this private board by email or domain
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Allowed Domains */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                      Allowed Domains
                    </Label>
                    <EmailDomainInput
                      value={allowedDomains}
                      onChange={setAllowedDomains}
                      placeholder="company.com"
                      type="domain"
                    />
                    <p className="text-xs text-gray-600">
                      Only users with these email domains can access the board
                    </p>
                  </div>

                  {/* Blocked Domains */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                      Blocked Domains
                    </Label>
                    <EmailDomainInput
                      value={blockedDomains}
                      onChange={setBlockedDomains}
                      placeholder="competitor.com"
                      type="domain"
                    />
                    <p className="text-xs text-gray-600">
                      Users with these email domains cannot access the board
                    </p>
                  </div>

                  {/* Allowed Emails */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                      Allowed Emails
                    </Label>
                    <EmailDomainInput
                      value={allowedEmails}
                      onChange={setAllowedEmails}
                      placeholder="user@example.com"
                      type="email"
                    />
                    <p className="text-xs text-gray-600">
                      Only these specific email addresses can access the board
                    </p>
                  </div>

                  {/* Blocked Emails */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                      Blocked Emails
                    </Label>
                    <EmailDomainInput
                      value={blockedEmails}
                      onChange={setBlockedEmails}
                      placeholder="blocked@example.com"
                      type="email"
                    />
                    <p className="text-xs text-gray-600">
                      These specific email addresses cannot access the board
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </ConfigCard>

        <ConfigCard>
          <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
            <CardTitle className="text-xl md:text-2xl font-fuzzy-bubbles text-gray-900">
              Expiration Settings
            </CardTitle>
            <CardDescription className="text-gray-600">
              Set when this board should become read-only
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="expirationDate"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
                >
                  Board Expiration (Optional)
                </Label>
                <DateTimePicker
                  date={expirationDate}
                  onDateTimeChange={setExpirationDate}
                  placeholder="Select expiration date and time"
                  error={!!errors.expirationDate}
                  className="w-full sm:w-fit"
                  min={new Date().toISOString().slice(0, 16)}
                />
                <p className="text-sm text-gray-600">
                  Leave empty for no expiration. Board will automatically become
                  read-only after this date.
                </p>
                {errors.expirationDate && (
                  <p className="text-xs text-rose-700">
                    {errors.expirationDate}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </ConfigCard>

        <ConfigCard>
          <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
            <CardTitle className="text-xl md:text-2xl font-fuzzy-bubbles text-gray-900">
              Theme Settings
            </CardTitle>
            <CardDescription className="text-gray-600">
              Customize the visual appearance of your board
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                  Background Color (Optional)
                </Label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {backgroundColorOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "cursor-pointer rounded-sm transition-all hover:scale-105",
                        backgroundColor === option.value
                          ? "ring-2 ring-offset-2 ring-gray-900 ring-offset-white"
                          : "",
                      )}
                      onClick={() => setBackgroundColor(option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setBackgroundColor(option.value);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={backgroundColor === option.value}
                      aria-label={`Select ${option.label} background color`}
                    >
                      <div
                        className={cn(
                          "w-full h-12 rounded-sm border-2 border-gray-900",
                          option.color,
                        )}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBackgroundColor(undefined)}
                    disabled={!backgroundColor}
                    className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
                  >
                    Clear Color
                  </Button>
                  {backgroundColor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div
                        className="w-4 h-4 rounded-sm border-2 border-gray-900"
                        style={{ backgroundColor }}
                      />
                      <span>{backgroundColor}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Choose a background color theme for your board. This will
                  create a beautiful gradient background.
                </p>
                {errors.backgroundColor && (
                  <p className="text-xs text-rose-700">
                    {errors.backgroundColor}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </ConfigCard>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading || isSuccess}
            onClick={() => router.push(`/boards/${board.id}/manage`)}
            className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isSuccess}
            className="bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSuccess
              ? "Updated!"
              : isLoading
                ? "Updating..."
                : "Update Board"}
          </Button>
        </div>
      </form>
    </div>
  );
}
