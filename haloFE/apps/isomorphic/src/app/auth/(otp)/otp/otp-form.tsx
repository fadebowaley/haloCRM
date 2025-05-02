'use client';

import { PinCode, Button } from 'rizzui';
import { Form } from '@core/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/lib/hooks/useAuth';
import { routes } from '@/config/routes';


type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // URL contains ?email=user@example.com

  const { verifyOtp, resendOtp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [otpValue, setOtpValue] = useState<string>(''.padStart(6, '')); // 👈 6 empty characters

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!email) return;

    setLoading(true);
    const result = await verifyOtp(data.otp, email);
    setLoading(false);

    if (result.success) {
      router.push(routes.signIn);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setLoading(true);
    await resendOtp(email);
    setLoading(false);
  };

  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-10">
          <PinCode
            variant="outline"
            setValue={(value) => setValue('otp', String(value))}
            type="number"
            length={6}
            size="lg"
            className="lg:justify-start"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Button
              className="w-full text-base font-medium"
              onClick={handleResend}
              type="button"
              size="xl"
              rounded="pill"
              variant="outline"
              disabled={loading}
            >
              RESEND OTP
            </Button>
            <Button
              className="w-full text-base font-medium"
              type="submit"
              size="xl"
              rounded="pill"
              isLoading={loading}
              disabled={loading}
            >
              VERIFY OTP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
