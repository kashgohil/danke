import { describe, expect, it } from 'vitest';

describe('Create Board Integration', () => {
  it('should have feature flag environment variable', () => {
    // Test that the feature flag is properly configured
    const enableMultiStep = process.env.NEXT_PUBLIC_ENABLE_MULTI_STEP_FORM;
    expect(enableMultiStep).toBeDefined();
    expect(enableMultiStep).toBe('true');
  });

  it('should export required components', async () => {
    // Test that all required components are properly exported
    const { MultiStepBoardCreationForm } = await import(
      '@/components/boards/board-creation-form'
    );
    const { SimpleBoardCreationForm } = await import(
      '@/components/boards/simple-board-creation-form'
    );
    const { CreateBoardClient } = await import(
      '@/app/create-board/create-board-client'
    );

    expect(MultiStepBoardCreationForm).toBeDefined();
    expect(SimpleBoardCreationForm).toBeDefined();
    expect(CreateBoardClient).toBeDefined();
  });

  it('should have proper component interfaces', async () => {
    // Test that components have the expected interface
    const { MultiStepBoardCreationForm } = await import(
      '@/components/boards/board-creation-form'
    );
    const { SimpleBoardCreationForm } = await import(
      '@/components/boards/simple-board-creation-form'
    );

    // These should be React components (functions)
    expect(typeof MultiStepBoardCreationForm).toBe('function');
    expect(typeof SimpleBoardCreationForm).toBe('function');
  });
});
