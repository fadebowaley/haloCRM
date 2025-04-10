'use client';

import {
  formDataAtom,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import FormSummary from '@/app/shared/multi-step/multi-step-2/form-summary';
import {
  startingTypeSchema,
  StartingTypeSchema,
} from '@/validators/multistep-form-2.schema';
import ClipboardIcon from '@core/components/icons/clipboard';
import ClipboardIconSuccess from '@core/components/icons/clipboard-success';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AdvancedRadio, Flex, RadioGroup, Title } from 'rizzui';

const startingTypes: {
  label: string;
  value: 'new' | 'existing';
  icon: React.ReactNode;
}[] = [
    {
      label: 'Create a new listing',
      value: 'new',
      icon: <ClipboardIcon className="size-8 shrink-0 text-gray-900" />,
    },
    {
      label: 'Duplicate an existing listing',
      value: 'existing',
      icon: <ClipboardIconSuccess className="size-8 shrink-0 text-gray-900" />,
    },
  ];

export default function StepOne() {
  const { step, gotoNextStep } = useStepperTwo();
  const [formData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<StartingTypeSchema>({
    resolver: zodResolver(startingTypeSchema),
    defaultValues: {
      startingType: formData.startingType,
    },
  });

  useEffect(() => {
    if (errors.startingType) {
      toast.error(errors.startingType.message as string);
    }
  }, [errors]);

  const onSubmit = () => {
    gotoNextStep();
  };

  return (
    <>
      <FormSummary title="Start a new listing" />
      <form id={`rhf-${step.toString()}`} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="startingType"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              setValue={onChange}
              className="grid grid-cols-1 gap-5"
            >
              {startingTypes.map((type) => (
                <AdvancedRadio
                  key={type.value}
                  value={type.value}
                  inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100 [&~span]:space-y-2"
                >
                  <Flex
                    align="center"
                    className="min-h-auto gap-4 px-0 py-5 md:min-h-[104px] md:gap-5 md:px-8"
                  >
                    {type.icon}
                    <Title
                      as="h4"
                      className="font-inter text-lg font-medium md:text-xl"
                    >
                      {type.label}
                    </Title>
                  </Flex>
                </AdvancedRadio>
              ))}
            </RadioGroup>
          )}
        />
      </form>
    </>
  );
}
