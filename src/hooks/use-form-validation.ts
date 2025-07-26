'use client';

import { useCallback, useState } from 'react';
import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
  reValidateMode?: 'onChange' | 'onBlur';
}

export interface UseFormValidationReturn<T> {
  values: Partial<T>;
  errors: Record<string, string>;
  isValid: boolean;
  isValidating: boolean;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  validateField: (field: keyof T) => Promise<boolean>;
  validateAll: () => Promise<boolean>;
  clearError: (field: keyof T) => void;
  clearAllErrors: () => void;
  reset: (values?: Partial<T>) => void;
  getFieldProps: (field: keyof T) => {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error: boolean;
    helperText?: string;
  };
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  mode = 'onSubmit',
  reValidateMode = 'onChange',
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> {
  const [values, setValuesState] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback(
    async (field: keyof T): Promise<boolean> => {
      setIsValidating(true);

      try {
        await schema.parseAsync(values);

        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });

        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.issues.find((err: any) =>
            err.path.includes(field as string)
          );
          if (fieldError) {
            setErrors((prev) => ({
              ...prev,
              [field as string]: fieldError.message,
            }));
          }
        }
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    [schema, values]
  );

  const validateAll = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);

    try {
      await schema.parseAsync(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: any) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [schema, values]);

  const setValue = useCallback(
    (field: keyof T, value: any) => {
      setValuesState((prev) => ({ ...prev, [field]: value }));

      if (touchedFields.has(field) && reValidateMode === 'onChange') {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });

        setTimeout(() => {
          validateField(field);
        }, 300);
      }
    },
    [touchedFields, reValidateMode, validateField]
  );

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }));
  }, []);

  const clearError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback((initialValues?: Partial<T>) => {
    setValuesState(initialValues || {});
    setErrors({});
    setTouchedFields(new Set());
  }, []);

  const getFieldProps = useCallback(
    (field: keyof T) => ({
      value: values[field] || '',
      onChange: (value: any) => {
        setValue(field, value);

        if (mode === 'onChange') {
          setTimeout(() => validateField(field), 300);
        }
      },
      onBlur: () => {
        setTouchedFields((prev) => new Set(prev).add(field));

        if (mode === 'onBlur' || mode === 'onChange') {
          validateField(field);
        }
      },
      error: !!errors[field as string],
      helperText: errors[field as string],
    }),
    [values, errors, setValue, validateField, mode]
  );

  const isValid =
    Object.keys(errors).length === 0 && Object.keys(values).length > 0;

  return {
    values,
    errors,
    isValid,
    isValidating,
    setValue,
    setValues,
    validateField,
    validateAll,
    clearError,
    clearAllErrors,
    reset,
    getFieldProps,
  };
}
