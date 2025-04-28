import { useState } from 'react';
import { FormData } from '../utils/types';

export const useMultiStepForm = (steps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    industry: null,
    users: []
  });

  const nextStep = () => {
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === steps,
  };
};