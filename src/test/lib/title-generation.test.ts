import { describe, expect, it } from 'vitest';

// Extract the title generation function for testing
function generateTitle(
  boardType:
    | 'appreciation'
    | 'birthday'
    | 'farewell'
    | 'welcome'
    | 'congratulations'
    | 'get-well'
    | 'sympathy'
    | 'holiday'
    | 'anniversary'
    | 'retirement'
    | 'graduation'
    | 'baby-shower'
    | 'wedding'
    | 'general',
  recipientName: string,
  nameType: 'first-name' | 'full-name' | 'nickname'
): string {
  if (!recipientName.trim()) return '';

  // Format the name based on the selected name type
  let formattedName = recipientName.trim();
  if (nameType === 'first-name') {
    formattedName = recipientName.split(' ')[0];
  }

  // Generate title based on board type
  switch (boardType) {
    case 'appreciation':
      return `Appreciation Board for ${formattedName}`;
    case 'birthday':
      return `Happy Birthday ${formattedName}!`;
    case 'farewell':
      return `Farewell ${formattedName}`;
    case 'welcome':
      return `Welcome ${formattedName}!`;
    case 'congratulations':
      return `Congratulations ${formattedName}!`;
    case 'get-well':
      return `Get Well Soon ${formattedName}`;
    case 'sympathy':
      return `In Memory of ${formattedName}`;
    case 'holiday':
      return `Holiday Wishes for ${formattedName}`;
    case 'anniversary':
      return `Celebrating ${formattedName}'s Anniversary`;
    case 'retirement':
      return `Happy Retirement ${formattedName}!`;
    case 'graduation':
      return `Congratulations Graduate ${formattedName}!`;
    case 'baby-shower':
      return `Baby Shower for ${formattedName}`;
    case 'wedding':
      return `Wedding Wishes for ${formattedName}`;
    case 'general':
      return `Board for ${formattedName}`;
    default:
      return `Board for ${formattedName}`;
  }
}

describe('Title Generation', () => {
  it('generates appreciation board title with full name', () => {
    const title = generateTitle('appreciation', 'John Smith', 'full-name');
    expect(title).toBe('Appreciation Board for John Smith');
  });

  it('generates birthday board title with full name', () => {
    const title = generateTitle('birthday', 'John Smith', 'full-name');
    expect(title).toBe('Happy Birthday John Smith!');
  });

  it('generates farewell board title with full name', () => {
    const title = generateTitle('farewell', 'John Smith', 'full-name');
    expect(title).toBe('Farewell John Smith');
  });

  it('generates general board title with full name', () => {
    const title = generateTitle('general', 'John Smith', 'full-name');
    expect(title).toBe('Board for John Smith');
  });

  it('generates welcome board title with full name', () => {
    const title = generateTitle('welcome', 'John Smith', 'full-name');
    expect(title).toBe('Welcome John Smith!');
  });

  it('generates congratulations board title with full name', () => {
    const title = generateTitle('congratulations', 'John Smith', 'full-name');
    expect(title).toBe('Congratulations John Smith!');
  });

  it('generates get-well board title with full name', () => {
    const title = generateTitle('get-well', 'John Smith', 'full-name');
    expect(title).toBe('Get Well Soon John Smith');
  });

  it('generates sympathy board title with full name', () => {
    const title = generateTitle('sympathy', 'John Smith', 'full-name');
    expect(title).toBe('In Memory of John Smith');
  });

  it('generates retirement board title with full name', () => {
    const title = generateTitle('retirement', 'John Smith', 'full-name');
    expect(title).toBe('Happy Retirement John Smith!');
  });

  it('generates graduation board title with full name', () => {
    const title = generateTitle('graduation', 'John Smith', 'full-name');
    expect(title).toBe('Congratulations Graduate John Smith!');
  });

  it('uses first name only when nameType is first-name', () => {
    const title = generateTitle('appreciation', 'John Smith', 'first-name');
    expect(title).toBe('Appreciation Board for John');
  });

  it('uses full name when nameType is nickname', () => {
    const title = generateTitle('appreciation', 'Johnny', 'nickname');
    expect(title).toBe('Appreciation Board for Johnny');
  });

  it('handles single name correctly with first-name type', () => {
    const title = generateTitle('appreciation', 'John', 'first-name');
    expect(title).toBe('Appreciation Board for John');
  });

  it('trims whitespace from recipient name', () => {
    const title = generateTitle('appreciation', '  John Smith  ', 'full-name');
    expect(title).toBe('Appreciation Board for John Smith');
  });

  it('returns empty string for empty recipient name', () => {
    const title = generateTitle('appreciation', '', 'full-name');
    expect(title).toBe('');
  });

  it('returns empty string for whitespace-only recipient name', () => {
    const title = generateTitle('appreciation', '   ', 'full-name');
    expect(title).toBe('');
  });

  it('handles multiple spaces in name correctly', () => {
    const title = generateTitle(
      'appreciation',
      'John  Middle  Smith',
      'first-name'
    );
    expect(title).toBe('Appreciation Board for John');
  });

  it('generates different titles for different board types', () => {
    const name = 'John Smith';
    const nameType = 'full-name';

    const appreciationTitle = generateTitle('appreciation', name, nameType);
    const birthdayTitle = generateTitle('birthday', name, nameType);
    const farewellTitle = generateTitle('farewell', name, nameType);
    const generalTitle = generateTitle('general', name, nameType);

    expect(appreciationTitle).toBe('Appreciation Board for John Smith');
    expect(birthdayTitle).toBe('Happy Birthday John Smith!');
    expect(farewellTitle).toBe('Farewell John Smith');
    expect(generalTitle).toBe('Board for John Smith');

    // Ensure they're all different
    const titles = [
      appreciationTitle,
      birthdayTitle,
      farewellTitle,
      generalTitle,
    ];
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(4);
  });
});
