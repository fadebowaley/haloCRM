'use client';

import {
  formDataAtom,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import FormSummary from '@/app/shared/multi-step/multi-step-2/form-summary';
import {
  basicInformationSchema,
  BasicInformationSchemaType,
} from '@/validators/multistep-form-2.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldError, Input, Radio, RadioGroup, Select, Text } from 'rizzui';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

const propertyTypes = [
  {
    label: 'Personal',
    value: 'personal',
  },
  {
    label: 'Shared',
    value: 'shared',
  },
];

const constructionStatus = [
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
];

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<BasicInformationSchemaType>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      address: formData.address,
      city: formData.city,
      constructionStatus: formData.constructionStatus,
      productDescription: formData.productDescription,
      propertyName: formData.propertyName,
      propertyFor: formData.propertyFor,
      propertyType: formData.propertyType,
    },
  });

  const onSubmit: SubmitHandler<BasicInformationSchemaType> = (data) => {
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
        title="Basic Information"
        description="You only need to provide this information once, during your first listing."
      />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow"
        >
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">Property For</Text>
              <Controller
                name="propertyFor"
                control={control}
                render={({ field: { value, onChange } }) => {
                  console.log('value', value);
                  return (
                    <RadioGroup
                      value={value}
                      setValue={onChange}
                      className="flex gap-4"
                    >
                      <Radio label="Rent" value="rent" name="type" />
                      <Radio label="Sell" value="sell" name="type" />
                    </RadioGroup>
                  );
                }}
              />
              {errors.propertyFor && (
                <FieldError
                  className="text-[13px]"
                  error={errors.propertyFor?.message}
                />
              )}
            </div>
            <Input
              label="Property Name"
              labelClassName="font-semibold text-gray-900"
              placeholder="property name..."
              {...register('propertyName')}
              error={errors.propertyName?.message}
              size="lg"
            />
            <Controller
              control={control}
              name="propertyType"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Property Type"
                  labelClassName="font-semibold text-gray-900"
                  dropdownClassName="!z-10 h-auto"
                  inPortal={true}
                  placeholder="property type..."
                  options={propertyTypes}
                  onChange={onChange}
                  value={value}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    propertyTypes?.find((r) => r.value === selected)?.label ??
                    ''
                  }
                  error={errors?.propertyType?.message as string}
                  size="lg"
                />
              )}
            />
            <Input
              label="City"
              labelClassName="font-semibold text-gray-900"
              placeholder="city name..."
              {...register('city')}
              error={errors.city?.message}
              size="lg"
            />
            <Input
              label="Address"
              labelClassName="font-semibold text-gray-900"
              placeholder="address line 1..."
              {...register('address')}
              error={errors.address?.message}
              size="lg"
            />
            <Controller
              control={control}
              name="constructionStatus"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Construction Status"
                  labelClassName="font-semibold text-gray-900"
                  dropdownClassName="!z-10 h-auto"
                  inPortal={true}
                  placeholder="construction status..."
                  options={constructionStatus}
                  onChange={onChange}
                  value={value}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    constructionStatus?.find((r) => r.value === selected)
                      ?.label ?? ''
                  }
                  error={errors?.constructionStatus?.message as string}
                  size="lg"
                />
              )}
            />
            <Controller
              control={control}
              name="productDescription"
              render={({ field: { onChange, value } }) => (
                <QuillEditor
                  value={value}
                  labelClassName="font-semibold text-gray-900"
                  label="Property Description"
                  onChange={onChange}
                  className="[&_.ql-editor]:min-h-[120px]"
                  error={errors?.productDescription?.message as string}
                />
              )}
            />
          </div>
        </form>
      </div>
    </>
  );
}
