import { metaObject } from '@/config/site.config';
import MultiStepFormTwo from '@/app/shared/multi-step/multi-step-2';

export const metadata = {
  ...metaObject('Multi Step Two'),
};

export default function MultiStepFormPageTwo() {
  return <MultiStepFormTwo />;
}
