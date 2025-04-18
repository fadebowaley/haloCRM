'use client';

import { Input, Text, Button } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { useState } from 'react';
import { routes } from '@/config/routes';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useMedia } from '@core/hooks/use-media';
import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from '@/validators/forget-password.schema';
import { useAuth } from '@/app/lib/hooks/useAuth';


const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const { forgotPassword } = useAuth();

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = async (data) => {
  try {
    const response = await forgotPassword(data.email);
    if (response.success) {
    toast.custom((t) => (
      <div className="relative w-full max-w-md rounded-xl bg-white p-4 text-gray-800 shadow-lg">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute right-4 top-4 rounded-full p-1 text-red-500 transition hover:bg-red-100 hover:text-red-700"
          aria-label="Close"
        >
          ×
        </button>
        <span className="pr-6 text-sm leading-relaxed">
          If this email is linked to an account, a password reset link will be
          on its way shortly. Please check your inbox or spam folder.
        </span>
      </div>
    ));



      setReset(initialValues); // resets form
    } else {
      toast.error(response.error || 'Something went wrong');
    }
  } catch (err) {
    console.error('Unexpected forgot password error:', err);
    toast.error('Something went wrong. Please try again.');
  }
};
  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message as string}
            />
            <Button
              className="border-primary-light w-full border-2 text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
