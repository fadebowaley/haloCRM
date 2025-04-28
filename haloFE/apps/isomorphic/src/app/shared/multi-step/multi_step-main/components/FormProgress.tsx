import React from 'react';

interface FormProgressProps {
  steps: string[];
  currentStep: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {i + 1 < currentStep ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${i + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
            
            {i < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;