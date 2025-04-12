'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';

// Initial values for the login form fields
const initialValues: LoginSchema = {
  email: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};

export default function SignInForm() {
  // State to manage form reset values
  const [reset, setReset] = useState({});

  // Function to handle form submission
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data); // Log the submitted data
    signIn('credentials', {
      ...data, // Pass the form data to the signIn function
    });
    // Optionally reset the form fields after submission
    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema} // Validation schema for the form
        resetValues={reset} // Values to reset the form
        onSubmit={onSubmit} // Submission handler
        useFormProps={{
          mode: 'onChange', // Validation mode
          defaultValues: initialValues, // Default values for the form
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')} // Register email input
              error={errors.email?.message} // Display error message if exists
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')} // Register password input
              error={errors.password?.message} // Display error message if exists
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')} // Register remember me checkbox
                label="Remember Me"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1} // Link to forgot password page
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp1} // Link to sign up page
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
