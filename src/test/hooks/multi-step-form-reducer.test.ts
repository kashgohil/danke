import {
  generateTitle,
  validateBasicInfo,
  validateBoardConfig,
  validateTypeConfig,
} from '@/hooks/use-multi-step-form';
import {
  BasicInfoData,
  BoardConfigData,
  TypeConfigData,
} from '@/types/multi-step-form';
import { describe, expect, it } from 'vitest';

describe('Multi-step form validation functions', () => {
  describe('validateBasicInfo', () => {
    it('should validate required fields', () => {
      const invalidData: BasicInfoData = {
        boardType: 'general',
        recipientName: '',
        nameType: 'full-name',
      };

      const result = validateBasicInfo(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.recipientName).toBeDefined();
    });

    it('should validate field lengths', () => {
      const invalidData: BasicInfoData = {
        boardType: 'general',
        recipientName: 'a'.repeat(256), // Too long
        nameType: 'full-name',
      };

      const result = validateBasicInfo(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.recipientName).toContain('255 characters');
    });

    it('should pass with valid data', () => {
      const validData: BasicInfoData = {
        boardType: 'appreciation',
        recipientName: 'John Doe',
        nameType: 'full-name',
      };

      const result = validateBasicInfo(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });
  });

  describe('validateTypeConfig', () => {
    it('should validate birthday date', () => {
      const invalidData: TypeConfigData = {
        birthdayDate: 'invalid-date',
      };

      const result = validateTypeConfig(invalidData, 'birthday');
      expect(result.isValid).toBe(false);
      expect(result.errors.birthdayDate).toBeDefined();
    });

    it('should validate custom message length', () => {
      const invalidData: TypeConfigData = {
        customMessage: 'a'.repeat(501), // Too long
      };

      const result = validateTypeConfig(invalidData, 'general');
      expect(result.isValid).toBe(false);
      expect(result.errors.customMessage).toContain('500 characters');
    });

    it('should pass with valid data', () => {
      const validData: TypeConfigData = {
        appreciationTheme: 'professional',
        showContributorNames: true,
        customMessage: 'Great work!',
      };

      const result = validateTypeConfig(validData, 'appreciation');
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });
  });

  describe('validateBoardConfig', () => {
    it('should validate required fields', () => {
      const validData: BoardConfigData = {
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
      };

      const result = validateBoardConfig(validData);
      expect(result.isValid).toBe(true); // All required fields present
    });

    it('should validate max posts per user range', () => {
      const invalidData: BoardConfigData = {
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
        maxPostsPerUser: 100, // Too high
      };

      const result = validateBoardConfig(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.maxPostsPerUser).toContain('between 1 and 50');
    });

    it('should validate expiration date is in future', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const invalidData: BoardConfigData = {
        postingMode: 'single',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
        expirationDate: yesterday.toISOString(),
      };

      const result = validateBoardConfig(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.expirationDate).toContain('future');
    });
  });

  describe('generateTitle', () => {
    it('should generate correct titles for different board types', () => {
      expect(generateTitle('appreciation', 'John Doe', 'full-name')).toBe(
        'Appreciation Board for John Doe'
      );
      expect(generateTitle('birthday', 'John Doe', 'full-name')).toBe(
        'Happy Birthday John Doe!'
      );
      expect(generateTitle('farewell', 'John Doe', 'full-name')).toBe(
        'Farewell John Doe'
      );
      expect(generateTitle('general', 'John Doe', 'full-name')).toBe(
        'Board for John Doe'
      );
    });

    it('should handle first name only', () => {
      expect(generateTitle('birthday', 'John Doe', 'first-name')).toBe(
        'Happy Birthday John!'
      );
    });

    it('should handle empty name', () => {
      expect(generateTitle('appreciation', '', 'full-name')).toBe('');
    });
  });
});
