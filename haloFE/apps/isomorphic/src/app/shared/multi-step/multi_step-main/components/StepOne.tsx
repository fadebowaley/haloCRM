'use client';

export interface StepOneProps {
  onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to HaloCRM!
      </h2>
      <p className="text-gray-600 mb-8">
        Let's get started with setting up your organization. 
        We'll guide you through a few simple steps to configure 
        your CRM for optimal performance.
      </p>
      <div className="flex justify-center">
        <button 
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}