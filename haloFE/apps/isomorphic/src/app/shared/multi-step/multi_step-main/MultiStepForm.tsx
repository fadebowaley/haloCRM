'use client';

import { useState } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';
import { IndustryTemplate, UserData } from './utils/types';
import { roles } from '@/data/forms/my-details';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState<IndustryTemplate | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleIndustrySelect = (selectedIndustry: IndustryTemplate) => {
    setIndustry(selectedIndustry);
    nextStep();
  };

  const handleUserSubmit = (newUsers: UserData[]) => {
    setUsers(newUsers);
    nextStep();
  };

  const handleContinue = () => nextStep();
  const handleBack = () => prevStep();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={nextStep} />;
      case 2:
        return <StepTwo onSelect={handleIndustrySelect} onBack={handleBack} onContinue={handleContinue}/>;
      case 3:
        return (
          <StepThree
            roles={[]} // Make sure this is defined
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <StepFour
            industry={industry}
            users={users}
            onBack={prevStep}
            onConfirm={nextStep}
          />
        );
      case 5:
        return <StepFive onFinish={true}/>;
      default:
        return <StepOne onNext={nextStep} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl mt-4 font-bold text-gray-900">HaloCRM</h1>
        <div className="flex items-center mt-6 justify-center align-center ">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 5 && (
                <div
                  className={`h-1 w-12 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        {renderStep()}
      </div>
    </div>
  );
}
