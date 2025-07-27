# Board Types

This document describes all the available board types in the application, inspired by Kudoboard's offerings.

## Available Board Types

### 1. **Appreciation Board** (`appreciation`)

- **Icon**: 🎉
- **Description**: Celebrate achievements and show gratitude
- **Title Format**: "Appreciation Board for [Name]"
- **Use Cases**: Employee recognition, thank you messages, celebrating accomplishments

### 2. **Birthday Board** (`birthday`)

- **Icon**: 🎂
- **Description**: Celebrate someone's special day
- **Title Format**: "Happy Birthday [Name]!"
- **Use Cases**: Birthday celebrations, milestone birthdays

### 3. **Farewell Board** (`farewell`)

- **Icon**: 👋
- **Description**: Say goodbye and share memories
- **Title Format**: "Farewell [Name]"
- **Use Cases**: Employee departures, moving away, general goodbyes

### 4. **Welcome Board** (`welcome`)

- **Icon**: 👋
- **Description**: Welcome new team members or colleagues
- **Title Format**: "Welcome [Name]!"
- **Use Cases**: New employee onboarding, welcoming new team members

### 5. **Congratulations Board** (`congratulations`)

- **Icon**: 🎊
- **Description**: Celebrate achievements and milestones
- **Title Format**: "Congratulations [Name]!"
- **Use Cases**: Promotions, achievements, general congratulations

### 6. **Get Well Soon Board** (`get-well`)

- **Icon**: 🌻
- **Description**: Send healing thoughts and support
- **Title Format**: "Get Well Soon [Name]"
- **Use Cases**: Illness recovery, medical procedures, health support

### 7. **Sympathy Board** (`sympathy`)

- **Icon**: 🕊️
- **Description**: Share condolences and support during difficult times
- **Title Format**: "In Memory of [Name]"
- **Use Cases**: Loss of loved ones, memorial services, condolences

### 8. **Holiday Board** (`holiday`)

- **Icon**: 🎄
- **Description**: Celebrate holidays and seasonal occasions
- **Title Format**: "Holiday Wishes for [Name]"
- **Use Cases**: Christmas, New Year, seasonal celebrations

### 9. **Anniversary Board** (`anniversary`)

- **Icon**: 🏆
- **Description**: Celebrate work anniversaries and milestones
- **Title Format**: "Celebrating [Name]'s Anniversary"
- **Use Cases**: Work anniversaries, company milestones, service recognition

### 10. **Retirement Board** (`retirement`)

- **Icon**: 🌅
- **Description**: Honor someone entering retirement
- **Title Format**: "Happy Retirement [Name]!"
- **Use Cases**: Retirement celebrations, career milestone recognition

### 11. **Graduation Board** (`graduation`)

- **Icon**: 🎓
- **Description**: Celebrate educational achievements
- **Title Format**: "Congratulations Graduate [Name]!"
- **Use Cases**: School graduations, certification completions, educational milestones

### 12. **Baby Shower Board** (`baby-shower`)

- **Icon**: 👶
- **Description**: Celebrate new arrivals and growing families
- **Title Format**: "Baby Shower for [Name]"
- **Use Cases**: Baby showers, new parent celebrations, family growth

### 13. **Wedding Board** (`wedding`)

- **Icon**: 💒
- **Description**: Celebrate love and new beginnings
- **Title Format**: "Wedding Wishes for [Name]"
- **Use Cases**: Wedding celebrations, engagement parties, marriage milestones

### 14. **General Board** (`general`)

- **Icon**: 📝
- **Description**: For any other occasion
- **Title Format**: "Board for [Name]"
- **Use Cases**: Custom occasions, miscellaneous celebrations, flexible use

## Implementation Details

### Name Formatting

All board types support three name formatting options:

- **First Name Only**: Uses only the first name from the input
- **Full Name**: Uses the complete name as entered
- **Nickname**: Uses the name as entered (typically for nicknames or preferred names)

### Technical Implementation

- Board types are defined as TypeScript union types
- Validation is handled through Zod schemas
- Title generation is automatic but customizable
- All types are supported in the database schema using varchar fields

### Usage in Code

```typescript
import { BasicInfoData } from '@/types/multi-step-form';

const boardData: BasicInfoData = {
  boardType: 'appreciation', // Any of the 14 supported types
  recipientName: 'John Smith',
  nameType: 'full-name',
  title: 'Custom title (optional - will auto-generate if not provided)',
};
```

## Future Considerations

- Additional board types can be easily added by updating the enum definitions
- Custom board types could be supported with user-defined titles and icons
- Seasonal variations of existing types (e.g., Christmas-specific holiday boards)
