'use client';

import {
  formDataAtom,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import FormSummary from '@/app/shared/multi-step/multi-step-2/form-summary';
import {
  BasicFeaturesSchema,
  basicFeaturesSchema,
} from '@/validators/multistep-form-2.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import QuantityInput from '../quantity-input';

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicFeaturesSchema>({
    resolver: zodResolver(basicFeaturesSchema),
    defaultValues: {
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      guests: formData.guests,
    },
  });

  const onSubmit: SubmitHandler<BasicFeaturesSchema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    gotoNextStep();
  };

  return (
    <>
      <FormSummary
        title="Some Basic Features"
        description="You only need to provide this information once, during your first listing."
      />
      <form
        id={`rhf-${step.toString()}`}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <Controller
          name="bedrooms"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="col-span-full flex w-full items-center justify-between gap-5 rounded-md border border-muted p-5 md:p-9">
              <span className="text-lg font-medium text-gray-900 md:text-xl">
                Bedrooms
              </span>
              <QuantityInput
                defaultValue={value}
                onChange={onChange}
                error={errors.bedrooms?.message as string}
              />
            </div>
          )}
        />
        <Controller
          name="bathrooms"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="col-span-full flex w-full items-center justify-between gap-5 rounded-md border border-muted p-5 md:p-9">
              <span className="text-lg font-medium text-gray-900 md:text-xl">
                Bathrooms
              </span>
              <QuantityInput
                defaultValue={value}
                onChange={onChange}
                error={errors.bathrooms?.message as string}
              />
            </div>
          )}
        />
        <Controller
          name="guests"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="col-span-full flex w-full items-center justify-between gap-5 rounded-md border border-muted p-5 md:p-9">
              <span className="text-lg font-medium text-gray-900 md:text-xl">
                Guests
              </span>
              <QuantityInput
                defaultValue={value}
                onChange={onChange}
                error={errors.guests?.message as string}
              />
            </div>
          )}
        />
      </form>
    </>
  );
}
