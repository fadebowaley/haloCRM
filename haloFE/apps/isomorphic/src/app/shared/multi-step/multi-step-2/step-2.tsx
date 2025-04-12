'use client';

import {
  formDataAtom,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import FormSummary from '@/app/shared/multi-step/multi-step-2/form-summary';
import {
  ListingUnitSchema,
  listingUnitSchema,
} from '@/validators/multistep-form-2.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AdvancedRadio, Flex, RadioGroup, Text, Title } from 'rizzui';

const properties: {
  label: string;
  subLabel: string;
  value: 'single' | 'multi';
}[] = [
    {
      label: 'Single unit property',
      subLabel:
        'This kind of property is rented out as a single independent entity.',
      value: 'single',
    },
    {
      label: 'Multi unit property',
      subLabel:
        'This kind of property is divided into multiple independent entities.',
      value: 'multi',
    },
  ];

export default function StepOne() {
  const { step, gotoNextStep } = useStepperTwo();

  const [formData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ListingUnitSchema>({
    resolver: zodResolver(listingUnitSchema),
    defaultValues: {
      listingUnit: formData.listingUnit,
    },
  });

  useEffect(() => {
    if (errors.listingUnit) {
      toast.error(errors.listingUnit.message as string);
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
          name="listingUnit"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              setValue={onChange}
              className="grid grid-cols-1 gap-5"
            >
              {properties.map((property) => (
                <AdvancedRadio
                  key={property.value}
                  value={property.value}
                  inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                >
                  <Flex
                    direction="col"
                    justify="center"
                    gap="2"
                    className="min-h-auto w-full px-0 py-5 md:min-h-[104px] md:px-8"
                  >
                    <Title
                      as="h4"
                      className="font-inter text-lg font-medium md:text-xl"
                    >
                      {property.label}
                    </Title>
                    <Text className="max-w-full truncate text-base text-gray-500">
                      {property.subLabel}
                    </Text>
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
