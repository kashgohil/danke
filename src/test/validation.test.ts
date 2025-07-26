import { describe, expect, it } from 'vitest';

const validateBoardTitle = (title: string) => {
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length > 100) {
    return 'Title is too long';
  }
  return null;
};

const validateRecipientName = (name: string) => {
  if (!name || name.trim().length === 0) {
    return 'Recipient name is required';
  }
  if (name.length > 100) {
    return 'Recipient name is too long';
  }
  return null;
};

const validatePostContent = (content: any) => {
  if (!content || !content.content || content.content.length === 0) {
    return 'Content is required';
  }
  return null;
};

const validateFileType = (filename: string) => {
  const allowedTypes = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.mp4',
    '.webm',
    '.mp3',
    '.wav',
    '.ogg',
  ];
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return allowedTypes.includes(extension);
};

const validateFileSize = (size: number) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return size <= maxSize;
};

const isWithinEditTimeLimit = (
  createdAt: Date,
  currentTime: Date = new Date()
) => {
  const timeDiff = currentTime.getTime() - createdAt.getTime();
  const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
  return timeDiff <= tenMinutes;
};

describe('Validation Functions', () => {
  describe('Board Title Validation', () => {
    it('should require title', () => {
      expect(validateBoardTitle('')).toBe('Title is required');
      expect(validateBoardTitle('   ')).toBe('Title is required');
    });

    it('should accept valid title', () => {
      expect(validateBoardTitle('Valid Title')).toBeNull();
    });

    it('should reject title that is too long', () => {
      const longTitle = 'a'.repeat(101);
      expect(validateBoardTitle(longTitle)).toBe('Title is too long');
    });
  });

  describe('Recipient Name Validation', () => {
    it('should require recipient name', () => {
      expect(validateRecipientName('')).toBe('Recipient name is required');
      expect(validateRecipientName('   ')).toBe('Recipient name is required');
    });

    it('should accept valid recipient name', () => {
      expect(validateRecipientName('John Doe')).toBeNull();
    });

    it('should reject name that is too long', () => {
      const longName = 'a'.repeat(101);
      expect(validateRecipientName(longName)).toBe(
        'Recipient name is too long'
      );
    });
  });

  describe('Post Content Validation', () => {
    it('should require content', () => {
      expect(validatePostContent(null)).toBe('Content is required');
      expect(validatePostContent({ content: [] })).toBe('Content is required');
    });

    it('should accept valid content', () => {
      const validContent = {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        ],
      };
      expect(validatePostContent(validContent)).toBeNull();
    });
  });

  describe('File Type Validation', () => {
    it('should accept valid image types', () => {
      expect(validateFileType('image.jpg')).toBe(true);
      expect(validateFileType('image.jpeg')).toBe(true);
      expect(validateFileType('image.png')).toBe(true);
      expect(validateFileType('image.gif')).toBe(true);
    });

    it('should accept valid video types', () => {
      expect(validateFileType('video.mp4')).toBe(true);
      expect(validateFileType('video.webm')).toBe(true);
    });

    it('should accept valid audio types', () => {
      expect(validateFileType('audio.mp3')).toBe(true);
      expect(validateFileType('audio.wav')).toBe(true);
      expect(validateFileType('audio.ogg')).toBe(true);
    });

    it('should reject invalid file types', () => {
      expect(validateFileType('document.txt')).toBe(false);
      expect(validateFileType('document.pdf')).toBe(false);
      expect(validateFileType('archive.zip')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(validateFileType('IMAGE.JPG')).toBe(true);
      expect(validateFileType('Video.MP4')).toBe(true);
    });
  });

  describe('File Size Validation', () => {
    it('should accept files under 10MB', () => {
      expect(validateFileSize(5 * 1024 * 1024)).toBe(true); // 5MB
      expect(validateFileSize(10 * 1024 * 1024)).toBe(true); // 10MB exactly
    });

    it('should reject files over 10MB', () => {
      expect(validateFileSize(11 * 1024 * 1024)).toBe(false); // 11MB
      expect(validateFileSize(20 * 1024 * 1024)).toBe(false); // 20MB
    });
  });

  describe('Edit Time Limit Validation', () => {
    it('should allow editing within 10 minutes', () => {
      const createdAt = new Date();
      const fiveMinutesLater = new Date(createdAt.getTime() + 5 * 60 * 1000);

      expect(isWithinEditTimeLimit(createdAt, fiveMinutesLater)).toBe(true);
    });

    it('should allow editing at exactly 10 minutes', () => {
      const createdAt = new Date();
      const tenMinutesLater = new Date(createdAt.getTime() + 10 * 60 * 1000);

      expect(isWithinEditTimeLimit(createdAt, tenMinutesLater)).toBe(true);
    });

    it('should not allow editing after 10 minutes', () => {
      const createdAt = new Date();
      const elevenMinutesLater = new Date(createdAt.getTime() + 11 * 60 * 1000);

      expect(isWithinEditTimeLimit(createdAt, elevenMinutesLater)).toBe(false);
    });
  });
});
