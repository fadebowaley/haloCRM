import AppointmentDashboard from '@/app/shared/appointment/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Appointment'),
};

export default function AppointmentPage() {
  return <AppointmentDashboard />;
}
