import Image from 'next/image';
import { useForm } from 'react-hook-form';
import homeFront from '@public/home-front.png';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { useStepperOne } from '@/app/shared/multi-step/multi-step-1';

export default function StepOne() {
  const { step, gotoNextStep } = useStepperOne();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    gotoNextStep();
  };

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @4xl:col-span-5">
        {/* <FormSummary
          descriptionClassName="@7xl:me-10"
          title="Welcome to HaloCRM"
          description="In the next step, we'll ask you the industry you are in  you have and if guests"
        /> */}
        <p className="text-4xl text-white">Welcome to 
          <span className='text-slate-700 font-semibold'> HaloCRM</span>
        </p>
        <div className="pt-8 text-white">This guided form will walk you through everything you need to provide. 
          It’s quick, easy, and you can always go back if you need to make changes.
            What to expect:
            <ul className='text-left text-gray-700 list-disc list-inside space-y-2 py-4'>
              <li>Simple step-by-step process</li>
              <li>Save progress as you go</li>
              <li>Go back to review any step</li>
            </ul>
          Let's Get Started, Click Next !
        </div>
      </div>

      <form
        id={`rhf-${step.toString()}`}
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-full grid aspect-[4/3] gap-4 @3xl:grid-cols-12 @4xl:col-span-7 @5xl:gap-5 @7xl:gap-8"
      >
        <Image
          src={homeFront}
          alt="home front part 1"
          className="mt-auto rounded-lg object-cover object-left-top @3xl:col-span-4 @3xl:h-96 @6xl:h-5/6"
        />
        <Image
          src={homeFront}
          alt="home front part 2"
          className="my-auto hidden rounded-lg object-cover @3xl:col-span-4 @3xl:block @3xl:h-96 @6xl:h-5/6"
        />
        <Image
          src={homeFront}
          alt="home front part 3"
          className="mb-auto hidden rounded-lg object-cover object-right-bottom @3xl:col-span-4 @3xl:block @3xl:h-96 @6xl:h-5/6"
        />
      </form>
    </>
  );
}
