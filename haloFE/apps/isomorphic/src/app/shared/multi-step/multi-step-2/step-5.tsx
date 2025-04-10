'use client';

import {
  formDataAtom,
  useStepperTwo,
} from '@/app/shared/multi-step/multi-step-2';
import FormSummary from '@/app/shared/multi-step/multi-step-2/form-summary';
import {
  FormPhotosSchema,
  formPhotosSchema,
} from '@/validators/multistep-form-2.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function StepFive() {
  const { step, gotoNextStep } = useStepperTwo();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormPhotosSchema>({
    resolver: zodResolver(formPhotosSchema),
    defaultValues: {
      photos: formData.photos,
    },
  });

  const onSubmit: SubmitHandler<FormPhotosSchema> = (data) => {
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
        title="Add Some Photo"
        description="You only need to provide this information once, during your first listing."
      />
      <div className="col-span-full flex items-center justify-center">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-grow gap-6 rounded-lg bg-white dark:bg-gray-0"
        >
          <UploadZone name="photos" getValues={getValues} setValue={setValue} />
        </form>
      </div>
    </>
  );
}
