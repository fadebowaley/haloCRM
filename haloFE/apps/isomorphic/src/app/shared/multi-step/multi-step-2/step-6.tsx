'use client';

import {
  formDataAtom,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import FormSummary from '@/app/shared/multi-step/multi-step-2/form-summary';
import {
  SizeAndPricingSchema,
  sizeAndPricingSchema,
} from '@/validators/multistep-form-2.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldError, Input, Radio, RadioGroup, Text } from 'rizzui';

export default function StepTwo() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const { step, gotoNextStep } = useStepperTwo();

  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<SizeAndPricingSchema>({
    resolver: zodResolver(sizeAndPricingSchema),
    defaultValues: {
      propertySize: formData.propertySize,
      pricePerSquare: formData.pricePerSquare,
      totalPrice: formData.totalPrice,
      priceType: formData.priceType,
    },
  });

  const onSubmit: SubmitHandler<SizeAndPricingSchema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));

    console.log('formData', formData);
    gotoNextStep();
  };

  return (
    <>
      <FormSummary
        title="Property Size and Pricing"
        description="You only need to provide this information once, during your first listing."
      />
      <div className="col-span-full">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 bg-white dark:bg-gray-0"
        >
          <Input
            type="number"
            label="Property Size"
            labelClassName="font-semibold text-gray-900"
            placeholder="property size in sft..."
            {...register('propertySize', { valueAsNumber: true })}
            error={errors.propertySize?.message}
            size="lg"
          />
          <Input
            type="number"
            label="Price per sft"
            labelClassName="font-semibold text-gray-900"
            placeholder="price per sft..."
            {...register('pricePerSquare', {
              valueAsNumber: true,
            })}
            error={errors.pricePerSquare?.message}
            size="lg"
          />
          <Input
            type="number"
            label="Price in Total"
            labelClassName="font-semibold text-gray-900"
            placeholder="price in total..."
            {...register('totalPrice', { valueAsNumber: true })}
            error={errors.totalPrice?.message}
            size="lg"
          />
          <div className="grid gap-4">
            <Text className="font-semibold text-gray-900">Price Type</Text>
            <Controller
              name="priceType"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <RadioGroup
                    value={value}
                    setValue={onChange}
                    className="flex gap-4"
                  >
                    <Radio label="Fixed" value="fixed" name="priceType" />
                    <Radio
                      label="Negotiable"
                      value="negotiable"
                      name="priceType"
                    />
                  </RadioGroup>
                );
              }}
            />
            {errors.priceType && (
              <FieldError
                className="text-[13px]"
                error={errors.priceType?.message}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
