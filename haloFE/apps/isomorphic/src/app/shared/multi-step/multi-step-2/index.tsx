'use client';

import { useAtom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import Navigator from '@/app/multi-step-2/navigator';
import StepOne from '@/app/shared/multi-step/multi-step-2/step-1';
import StepTwo from '@/app/shared/multi-step/multi-step-2/step-2';
import StepThree from '@/app/shared/multi-step/multi-step-2/step-3';
import StepFour from '@/app/shared/multi-step/multi-step-2/step-4';
import StepFive from '@/app/shared/multi-step/multi-step-2/step-5';
import StepSix from '@/app/shared/multi-step/multi-step-2/step-6';
import Congratulations from '@/app/shared/multi-step/multi-step-2/congratulations';
import { FileSchema } from '@/validators/common-rules';

type FormDataType = {
  startingType: string;
  listingUnit: string;
  propertyFor: string;
  propertyName: string;
  propertyType: string;
  city: string | undefined;
  address: string | undefined;
  constructionStatus: string | undefined;
  productDescription: string | undefined;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  photos: FileSchema[] | undefined;
  priceType: string;
  totalPrice?: number | undefined;
  pricePerSquare?: number | undefined;
  propertySize?: number | undefined;
};

export const initialFormData = {
  startingType: '',
  listingUnit: '',
  propertyFor: '',
  propertyName: '',
  propertyType: '',
  city: undefined,
  address: undefined,
  constructionStatus: '',
  productDescription: '',
  bedrooms: 1,
  bathrooms: 1,
  guests: 1,
  photos: undefined,
  priceType: '',
  totalPrice: undefined,
  pricePerSquare: undefined,
  propertySize: undefined,
};

export const formDataAtom = atomWithStorage<FormDataType>(
  'multiStepFormTwo',
  initialFormData
);

export enum Step {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
}

const firstStep = Step.StepOne;
export const stepperAtomTwo = atomWithReset<Step>(firstStep);

export function useStepperTwo() {
  const [step, setStep] = useAtom(stepperAtomTwo);

  // function gotoStep(step: Step) {
  //   setStep(step);
  // }
  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > firstStep ? step - 1 : step);
  }
  function resetStepper() {
    setStep(firstStep);
  }
  return {
    step,
    setStep,
    // gotoStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.StepOne]: StepOne,
  [Step.StepTwo]: StepTwo,
  [Step.StepThree]: StepThree,
  [Step.StepFour]: StepFour,
  [Step.StepFive]: StepFive,
  [Step.StepSix]: StepSix,
  [Step.StepSeven]: Congratulations,
};

export const stepOneTotalSteps = Object.keys(MAP_STEP_TO_COMPONENT).length;

export default function MultiStepFormTwo() {
  const [step] = useAtom(stepperAtomTwo);
  const [formData] = useAtom(formDataAtom);

  const Component = MAP_STEP_TO_COMPONENT[step];

  return (
    <div className="mx-auto max-w-2xl rounded-[20px] bg-white p-5 shadow-roundedCard dark:bg-gray-0 md:p-8 lg:p-12">
      <Component />
      <Navigator />
    </div>
  );
}
