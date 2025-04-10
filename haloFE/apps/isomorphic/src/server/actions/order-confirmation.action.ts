'use server';

import { render } from '@react-email/render';
import OrderConfirmationEmail from '@/email-templates/order-confirmation';
import { sendEmail } from '@/email-templates/email';

export const sendOrderConfirmationEmail = async (data: { email: string }) => {
  const to = `John Doe<${data.email}>`;

  sendEmail({
    to: to,
    subject: 'Your Order is Confirmed! - Isomorphic',
    html: render(OrderConfirmationEmail()) as unknown as string,
  });

  return true;
};
