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
  validateField: (field: keyof T, value: any) => boolean;
  validateAll: () => boolean;
  touchedFields: Set<keyof T>;
  clearError: (field: keyof T) => void;
  reset: (values?: Partial<T>) => void;
  getFieldProps: (field: keyof T) => {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error: boolean;
    helperText?: string;
  };
}

export function useForm<T extends Record<string, any>>({
  schema,
  mode = 'onSubmit',
  reValidateMode = 'onChange',
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> {
  // states
  const [values, setValuesState] = useState<Partial<T>>(schema.parse({}));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());
  const [isValidating, setIsValidating] = useState(false);

  // utils
  const clearError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const validateField = useCallback(
    (field: keyof T, value: any): boolean => {
      setIsValidating(true);

      try {
        schema.parse({ ...values, [field]: value });
        clearError(field);
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
    [schema, values, clearError]
  );

  const validateAll = useCallback(
    (validationValues: Partial<T> = values): boolean => {
      setIsValidating(true);

      try {
        schema.parse(validationValues);
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.issues.forEach((err: any) => {
            if (err.path.length > 0) {
              newErrors[err.path[0]] = err.message;
            }
          });
          setErrors(newErrors);
        }
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    [schema, values, touchedFields]
  );

  const setValue = useCallback(
    (field: keyof T, value: any) => {
      setValuesState((prev) => ({ ...prev, [field]: value }));

      if (touchedFields.has(field) && reValidateMode === 'onChange') {
        validateField(field, value);
      }
    },
    [touchedFields, reValidateMode, validateField, clearError]
  );

  const setValues = useCallback(
    (newValues: Partial<T>) => {
      let currentValue = newValues;
      setValuesState((prev) => {
        currentValue = { ...prev, ...newValues };
        return currentValue;
      });
      validateAll(currentValue);
    },
    [validateAll]
  );

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
        validateField(field, value);
      },
      onBlur: () => {
        setTouchedFields((prev) => new Set(prev).add(field));
        validateField(field, values[field]);
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
    touchedFields,
    validateField,
    validateAll,
    clearError,
    reset,
    getFieldProps,
  };
}
