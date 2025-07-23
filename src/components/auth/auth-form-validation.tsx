'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

interface FormField {
  name: string;
  label: string;
  type: 'email' | 'password' | 'text';
  value: string;
  error?: string;
  validationRules?: ValidationRule[];
}

interface AuthFormValidationProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  onFieldChange: (name: string, value: string) => void;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  submitLabel: string;
  isLoading?: boolean;
  globalError?: string;
  successMessage?: string;
}

export function AuthFormValidation({
  title,
  subtitle,
  fields,
  onFieldChange,
  onSubmit,
  submitLabel,
  isLoading = false,
  globalError,
  successMessage,
}: AuthFormValidationProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: FormField): string | null => {
    if (!field.validationRules) return null;

    for (const rule of field.validationRules) {
      if (!rule.test(field.value)) {
        return rule.message;
      }
    }
    return null;
  };

  const handleFieldChange = (name: string, value: string) => {
    onFieldChange(name, value);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Check for validation errors
    const hasErrors = fields.some((field) => validateField(field) !== null);
    if (hasErrors) return;

    // Submit form data
    const formData = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, string>);

    await onSubmit(formData);
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const isFormValid = fields.every((field) => {
    const error = validateField(field);
    return error === null && field.value.trim() !== '';
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => {
            const fieldError = touched[field.name]
              ? validateField(field)
              : null;
            const showPassword = showPasswords[field.name];

            return (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type={
                      field.type === 'password' && showPassword
                        ? 'text'
                        : field.type
                    }
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    className={`
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm 
                      ring-offset-background file:border-0 file:bg-transparent 
                      file:text-sm file:font-medium placeholder:text-muted-foreground 
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                      focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        fieldError
                          ? 'border-red-500 focus-visible:ring-red-500'
                          : 'border-input focus-visible:ring-blue-500'
                      }
                      ${field.type === 'password' ? 'pr-10' : ''}
                    `}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    disabled={isLoading}
                  />
                  {field.type === 'password' && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.name)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                {fieldError && (
                  <div className="flex items-center space-x-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{fieldError}</span>
                  </div>
                )}
              </div>
            );
          })}

          {globalError && (
            <div className="flex items-center space-x-2 p-3 rounded-md bg-red-50 text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{globalError}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center space-x-2 p-3 rounded-md bg-green-50 text-green-700">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Loading...' : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message,
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= length,
    message: message || `Must be at least ${length} characters`,
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= length,
    message: message || `Must be no more than ${length} characters`,
  }),

  password: (
    message = 'Password must be at least 8 characters with uppercase, lowercase, and number'
  ): ValidationRule => ({
    test: (value) => {
      const hasLength = value.length >= 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      return hasLength && hasUpper && hasLower && hasNumber;
    },
    message,
  }),

  confirmPassword: (
    originalPassword: string,
    message = 'Passwords do not match'
  ): ValidationRule => ({
    test: (value) => value === originalPassword,
    message,
  }),

  name: (
    message = 'Name must be at least 2 characters and contain only letters and spaces'
  ): ValidationRule => ({
    test: (value) => /^[a-zA-Z\s]{2,}$/.test(value.trim()),
    message,
  }),
};
