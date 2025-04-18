'use client';

import { Input, Text, Button } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMedia } from '@core/hooks/use-media';

import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/validators/reset-password.schema';
import { useAuth } from '@/app/lib/hooks/useAuth';
import { routes } from '@/config/routes';





export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const initialValues = {
    password: '',
    confirmPassword: '',
    token: token ?? '', // include token in default values
  };

  console.log('this is the token', token);
  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (formData) => {
    try {
      if (!token) {
        toast.error('Invalid or missing reset token.');
        return;
      }

      const response = await resetPassword(token, formData.password);

      if (response.success) {
        toast.success('Password reset successful');
        router.push(routes.signIn); // ✅ redirect to login page
      } else {
        toast.error(response.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Unexpected error during password reset:', err);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Form<ResetPasswordSchema>
      validationSchema={resetPasswordSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{ defaultValues: initialValues }}
    >
      {({ register, formState: { errors } }) => (
        <div className="space-y-5">
          <Input
            type="password"
            label="New Password"
            placeholder="Enter your new password"
            rounded="pill"
            size={isMedium ? 'lg' : 'xl'}
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your new password"
            rounded="pill"
            size={isMedium ? 'lg' : 'xl'}
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button
            className="border-primary-light w-full border-2 text-base font-medium"
            type="submit"
            size={isMedium ? 'lg' : 'xl'}
            rounded="pill"
          >
            Change Password
          </Button>
        </div>
      )}
    </Form>
  );
}
