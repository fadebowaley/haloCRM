'use client';

import {
  stepOneTotalSteps,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import cn from '@core/utils/class-names';
import { Flex, Text, Title } from 'rizzui';

interface FormSummaryProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function FormSummary({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: FormSummaryProps) {
  const { step } = useStepperTwo();
  return (
    <div className={cn('mb-6 md:mb-10', className)}>
      <Flex className="flex-wrap-reverse justify-between gap-x-5 gap-y-2 md:flex-nowrap">
        <Title as="h3" className={cn('font-inter font-medium', titleClassName)}>
          {title}
        </Title>
        <Text
          as="span"
          className="w-full text-nowrap font-medium text-gray-500 md:w-auto"
        >
          Step {step + 1} of {stepOneTotalSteps - 1}
        </Text>
      </Flex>
      <Text
        className={cn('mt-3 text-base text-gray-500', descriptionClassName)}
      >
        {description}
      </Text>
    </div>
  );
}
