import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import ForgetPasswordForm from './reset-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Reset your Password">
      <ForgetPasswordForm />
    </AuthWrapperTwo>
  );
}
