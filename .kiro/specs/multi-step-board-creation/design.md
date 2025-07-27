# Design Document

## Overview

The multi-step board creation feature transforms the existing single-step board creation form into a guided wizard with three distinct steps. This design enhances user experience by organizing board configuration into logical stages and enables more advanced customization options. The solution maintains backward compatibility with the existing board data structure while extending it to support new configuration options.

## Architecture

### Component Structure

The multi-step form will be implemented using a wizard pattern with the following component hierarchy:

```
MultiStepBoardCreationForm (Container)
├── StepIndicator (Progress display)
├── StepContent (Dynamic step content)
│   ├── BasicInfoStep (Step 1)
│   ├── TypeConfigStep (Step 2)
│   └── BoardConfigStep (Step 3)
├── NavigationControls (Back/Next/Submit buttons)
└── FormSummary (Final step summary)
```

### State Management

The form will use React's `useState` and `useReducer` hooks to manage:

- Current step index
- Form data for all steps
- Validation state per step
- Loading and error states
- Step completion status

### Data Flow

1. **Step Navigation**: User progresses through steps with validation at each stage
2. **Data Persistence**: Form data is maintained in component state throughout the process
3. **Validation**: Each step validates independently before allowing progression
4. **Submission**: Final step aggregates all data and submits to the existing board creation API

## Components and Interfaces

### MultiStepBoardCreationForm

Main container component that orchestrates the multi-step process.

```typescript
interface MultiStepBoardCreationFormProps {
  onSuccess?: (board: Board) => void;
  onCancel?: () => void;
}

interface FormState {
  currentStep: number;
  stepData: {
    basicInfo: BasicInfoData;
    typeConfig: TypeConfigData;
    boardConfig: BoardConfigData;
  };
  stepValidation: {
    [stepIndex: number]: boolean;
  };
  isSubmitting: boolean;
  submitError: string | null;
}
```

### Step Components

#### BasicInfoStep (Step 1)

Collects fundamental board information.

```typescript
interface BasicInfoData {
  boardType: 'appreciation' | 'birthday' | 'farewell' | 'general';
  recipientName: string;
  nameType: 'first-name' | 'full-name' | 'nickname';
  title?: string; // Auto-generated based on type and name, but editable
}

interface BasicInfoStepProps {
  data: BasicInfoData;
  onChange: (data: Partial<BasicInfoData>) => void;
  onValidationChange: (isValid: boolean) => void;
  errors: Record<string, string>;
}
```

#### TypeConfigStep (Step 2)

Provides type-specific configuration options.

```typescript
interface TypeConfigData {
  // Appreciation-specific
  appreciationTheme?: 'professional' | 'casual' | 'celebration';
  showContributorNames?: boolean;

  // Birthday-specific
  birthdayDate?: string;
  ageDisplay?: 'show' | 'hide' | 'milestone-only';

  // Farewell-specific
  farewellType?: 'retirement' | 'job-change' | 'relocation' | 'other';
  lastWorkingDay?: string;

  // General options
  customMessage?: string;
  backgroundColor?: string;
}

interface TypeConfigStepProps {
  boardType: BasicInfoData['boardType'];
  data: TypeConfigData;
  onChange: (data: Partial<TypeConfigData>) => void;
  onValidationChange: (isValid: boolean) => void;
  errors: Record<string, string>;
}
```

#### BoardConfigStep (Step 3)

Configures board behavior and posting rules.

```typescript
interface BoardConfigData {
  postingMode: 'single' | 'multiple';
  moderationEnabled: boolean;
  allowAnonymous: boolean;
  maxPostsPerUser?: number; // Only for multiple mode
  boardVisibility: 'public' | 'private';
  expirationDate?: string;
}

interface BoardConfigStepProps {
  data: BoardConfigData;
  onChange: (data: Partial<BoardConfigData>) => void;
  onValidationChange: (isValid: boolean) => void;
  errors: Record<string, string>;
}
```

### StepIndicator

Visual progress indicator showing current step and completion status.

```typescript
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  completedSteps: number[];
}
```

### NavigationControls

Handles step navigation and form submission.

```typescript
interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoBack: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}
```

## Data Models

### Extended Board Schema

The existing board schema will be extended to support new configuration options:

```typescript
// Extended create board schema
export const createMultiStepBoardSchema = z.object({
  // Existing fields
  title: z.string().min(1).max(255),
  recipientName: z.string().min(1).max(255),

  // New fields
  boardType: z.enum(['appreciation', 'birthday', 'farewell', 'general']),
  nameType: z.enum(['first-name', 'full-name', 'nickname']),
  postingMode: z.enum(['single', 'multiple']),
  moderationEnabled: z.boolean().default(false),
  allowAnonymous: z.boolean().default(true),
  maxPostsPerUser: z.number().min(1).max(50).optional(),
  boardVisibility: z.enum(['public', 'private']).default('public'),
  expirationDate: z.string().datetime().optional(),

  // Type-specific configurations (stored as JSON)
  typeConfig: z.record(z.any()).optional(),
});
```

### Database Schema Updates

The boards table will be extended with new columns:

```sql
ALTER TABLE boards ADD COLUMN board_type VARCHAR(50) DEFAULT 'general';
ALTER TABLE boards ADD COLUMN name_type VARCHAR(50) DEFAULT 'full-name';
ALTER TABLE boards ADD COLUMN posting_mode VARCHAR(50) DEFAULT 'multiple';
ALTER TABLE boards ADD COLUMN moderation_enabled BOOLEAN DEFAULT false;
ALTER TABLE boards ADD COLUMN allow_anonymous BOOLEAN DEFAULT true;
ALTER TABLE boards ADD COLUMN max_posts_per_user INTEGER;
ALTER TABLE boards ADD COLUMN board_visibility VARCHAR(50) DEFAULT 'public';
ALTER TABLE boards ADD COLUMN expiration_date TIMESTAMP;
ALTER TABLE boards ADD COLUMN type_config JSONB;
```

## Error Handling

### Validation Strategy

1. **Step-level Validation**: Each step validates its own data independently
2. **Real-time Validation**: Form fields validate on blur and change events
3. **Cross-step Validation**: Final validation ensures consistency across all steps
4. **Server Validation**: Backend validates complete form data before board creation

### Error Display

- **Field Errors**: Displayed inline below each form field
- **Step Errors**: Summary of step-level validation issues
- **Navigation Errors**: Prevent progression when validation fails
- **Submission Errors**: Global error display for server-side issues

### Error Recovery

- **Auto-save**: Form data persists in component state during navigation
- **Retry Logic**: Failed submissions can be retried without data loss
- **Graceful Degradation**: Form falls back to basic mode if advanced features fail

## Testing Strategy

### Unit Tests

1. **Component Testing**: Test each step component in isolation
2. **Validation Testing**: Verify form validation logic for all scenarios
3. **State Management**: Test form state transitions and data persistence
4. **Error Handling**: Test error scenarios and recovery mechanisms

### Integration Tests

1. **Multi-step Flow**: Test complete wizard navigation and data flow
2. **API Integration**: Test form submission with backend board creation
3. **Validation Integration**: Test cross-step validation and error handling
4. **Browser Compatibility**: Test form behavior across different browsers

### End-to-End Tests

1. **Complete User Journey**: Test full board creation process from start to finish
2. **Error Scenarios**: Test form behavior with network errors and server failures
3. **Data Persistence**: Test form data retention during page refresh and navigation
4. **Accessibility**: Test keyboard navigation and screen reader compatibility

### Performance Testing

1. **Form Rendering**: Measure component render times for each step
2. **Validation Performance**: Test validation speed with large datasets
3. **Memory Usage**: Monitor memory consumption during long form sessions
4. **Bundle Size**: Ensure new components don't significantly increase bundle size

## Implementation Considerations

### Backward Compatibility

- Existing board creation API remains unchanged for simple boards
- New multi-step form can create boards compatible with existing system
- Legacy board creation form remains available as fallback option

### Progressive Enhancement

- Basic board creation works without JavaScript
- Advanced features enhance experience when available
- Form gracefully handles missing or disabled features

### Accessibility

- Keyboard navigation between steps and form fields
- Screen reader announcements for step changes and validation errors
- High contrast mode support for visual indicators
- Focus management during step transitions

### Performance Optimization

- Lazy loading of step components to reduce initial bundle size
- Debounced validation to prevent excessive API calls
- Memoization of expensive validation calculations
- Efficient re-rendering using React optimization techniques
