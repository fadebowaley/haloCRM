'use client';

import Header from './header';
import MultiStepFormOne from '@/app/shared/multi-step/multi-step-1';
import MultiStepFormTwo from '@/app/shared/multi-step/multi-step-2'

export default function MultiStepFormPageShell() {
  return (
    <div className="">
      <Header className="" />
      {/* <MultiStepFormOne /> */}
      <MultiStepFormTwo />
    </div>
  );
}
