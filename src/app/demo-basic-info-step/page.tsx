'use client';

import { BasicInfoStep } from '@/components/boards/basic-info-step';
import { BasicInfoData } from '@/types/multi-step-form';
import { useState } from 'react';

export default function DemoBasicInfoStepPage() {
  const [data, setData] = useState<BasicInfoData>({
    boardType: 'appreciation',
    recipientName: '',
    nameType: 'full-name',
    title: '',
  });

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (newData: Partial<BasicInfoData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid);
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Basic Info Step Demo</h1>

      <div className="space-y-6">
        <BasicInfoStep
          data={data}
          onChange={handleChange}
          onValidationChange={handleValidationChange}
          errors={errors}
        />

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <div className="space-y-2">
            <p>
              <strong>Is Valid:</strong> {isValid ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Current Data:</strong>
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
            {Object.keys(errors).length > 0 && (
              <>
                <p>
                  <strong>Errors:</strong>
                </p>
                <pre className="bg-red-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(errors, null, 2)}
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
