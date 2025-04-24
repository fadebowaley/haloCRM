'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@core/hooks/use-media';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { useAuth } from '@/app/lib/hooks/useAuth';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '', // Add this field for confirm password
  isAgreed: false,
  isOwner: true, // Hidden but set to true by default
  firstname: '',
  lastname: '',
};


export default function SignUpForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, register: registerUser } = useAuth();

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    setError(null);
    console.log('Submitting registration with data:', data);

    // Password validation: Ensure password and confirmPassword match
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match.');
      return; // Prevent submission if passwords don't match
    }

    // Call the register function from useAuth
    const res = await registerUser({
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      isAgreed: data.isAgreed,
      isOwner: data.isOwner, // Hidden and set to true
    });

    console.log('Registration response:', res);

    if (!res.success) {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors }, watch }) => {
          const isAgreedChecked = watch('isAgreed');

          return (
            <div className="space-y-5">
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                placeholder="Enter your first name"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('firstname')}
                error={errors.firstname?.message}
              />
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                placeholder="Enter your last name"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('lastname')}
                error={errors.lastname?.message}
              />
              <Input
                type="email"
                size={isMedium ? 'lg' : 'xl'}
                placeholder="Enter your email"
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
              />
              <Password
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                placeholder="Confirm your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <div className="flex items-start pb-2 text-gray-700">
                <Checkbox {...register('isAgreed')} variant="flat" />
                <p className="-mt-0.5 ps-2 text-sm leading-relaxed">
                  By signing up you have agreed to our{' '}
                  <Link
                    href="/"
                    className="font-semibold text-blue transition-colors hover:text-gray-1000"
                  >
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link
                    href="/"
                    className="font-semibold text-blue transition-colors hover:text-gray-1000"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              {error && <Text className="text-sm text-red-600">{error}</Text>}
              <Button
                className="border-primary-light w-full border-2 text-base font-medium"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                disabled={isLoading || !isAgreedChecked}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          );
        }}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Already have an account?{' '}
        <Link
          href={routes.auth.signIn2}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
