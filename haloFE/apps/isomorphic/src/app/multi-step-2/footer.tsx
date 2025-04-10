'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import {
  formDataAtom,
  initialFormData,
  stepperAtomTwo,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
}

function buttonLabel(formId?: number) {
  if (formId === 5) {
    return 'Submit';
  }
  if (formId === 6) {
    return 'Back to Home';
  }
  return 'Next';
}

export default function Footer({ isLoading, className }: FooterProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setFormData = useSetAtom(formDataAtom);
  const { step, gotoPrevStep } = useStepperTwo();
  const resetLocation = useResetAtom(stepperAtomTwo);

  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  function buttonAttr() {
    if (step === 6) {
      return {
        onClick: () => push('/'),
      };
    }
    return { form: `rhf-${step?.toString()}` };
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 pt-8 md:pt-12',
        className
      )}
    >
      {step > 0 && step < 6 && (
        <Button size="lg" rounded="lg" variant="outline" onClick={gotoPrevStep}>
          Back
        </Button>
      )}
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        size="lg"
        rounded="lg"
        variant="solid"
        {...buttonAttr()}
        type={'submit'}
        className="ml-auto"
      >
        {buttonLabel(step)}
      </Button>
    </div>
  );
}
