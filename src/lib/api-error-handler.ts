import { useCallback } from 'react';
import { z } from 'zod';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class ApiErrorHandler {
  static async handleResponse(response: Response): Promise<any> {
    if (response.ok) {
      try {
        return await response.json();
      } catch (error) {
        return { success: true };
      }
    }

    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch (error) {
      errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const apiError: ApiError = {
      message: this.getErrorMessage(response.status, errorData),
      code: errorData.code,
      status: response.status,
      details: errorData.details,
    };

    throw apiError;
  }

  static getErrorMessage(status: number, errorData: any): string {
    if (errorData.error && typeof errorData.error === 'string') {
      return errorData.error;
    }

    switch (status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'You need to sign in to perform this action.';
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This action conflicts with existing data.';
      case 413:
        return "The file or data you're trying to upload is too large.";
      case 422:
        return 'The data you provided is invalid. Please check and try again.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Something went wrong on our end. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Our service is temporarily unavailable. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  static isNetworkError(error: any): boolean {
    return (
      error instanceof TypeError ||
      error.message?.includes('fetch') ||
      error.message?.includes('network') ||
      error.message?.includes('Failed to fetch')
    );
  }

  static handleNetworkError(): ApiError {
    return {
      message: 'Network error. Please check your connection and try again.',
      code: 'NETWORK_ERROR',
    };
  }

  static handleValidationError(error: z.ZodError): ApiError {
    const firstError = error.issues[0];
    return {
      message: firstError?.message || 'Please check your input and try again.',
      code: 'VALIDATION_ERROR',
      details: error.issues,
    };
  }
}

export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    return await ApiErrorHandler.handleResponse(response);
  } catch (error) {
    console.log('apiRequest caught error:', error);

    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 401
    ) {
      console.log(
        '401 error detected in apiRequest, calling handleUnauthorized'
      );
      handleUnauthorized();
      throw error;
    }

    if (ApiErrorHandler.isNetworkError(error)) {
      throw ApiErrorHandler.handleNetworkError();
    }

    if (error instanceof z.ZodError) {
      throw ApiErrorHandler.handleValidationError(error);
    }

    // Re-throw ApiError instances
    if (error && typeof error === 'object' && 'message' in error) {
      throw error;
    }

    // Handle unknown errors
    throw {
      message: 'An unexpected error occurred. Please try again.',
      code: 'UNKNOWN_ERROR',
    } as ApiError;
  }
}

function handleUnauthorized() {
  if (typeof window !== 'undefined') {
    console.log('401 detected - triggering logout and redirect');

    // Dispatch a custom event that components can listen to
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));

    // Also immediately redirect as fallback
    setTimeout(() => {
      console.log('Fallback redirect triggered');
      window.location.href = '/';
    }, 1000); // Increased timeout to give event handler time to work
  }
}

export function useApiErrorHandler() {
  const handleError = useCallback((error: any): string => {
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 401
    ) {
      console.log(
        '401 error detected in useApiErrorHandler, calling handleUnauthorized'
      );
      handleUnauthorized();
      return error.message || 'You need to sign in to perform this action.';
    }

    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }

    if (ApiErrorHandler.isNetworkError(error)) {
      return ApiErrorHandler.handleNetworkError().message;
    }

    if (error instanceof z.ZodError) {
      return ApiErrorHandler.handleValidationError(error).message;
    }

    return 'An unexpected error occurred. Please try again.';
  }, []);

  return { handleError };
}
