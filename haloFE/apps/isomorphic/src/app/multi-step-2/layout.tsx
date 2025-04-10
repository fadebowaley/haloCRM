import Header from '@/app/multi-step-2/header';
import Image from 'next/image';
import { Box } from 'rizzui/box';

export default function MultiStepLayoutTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="min-h-screen @container">
      <Header />
      <Box className="relative">
        <Box className="absolute inset-x-0 top-0 h-[224px] md:h-[424px]">
          <Image
            src="/multi-step-2-bg.jpg"
            alt="art background"
            fill
            className="object-cover object-center"
            priority
          />
        </Box>
        <Box className="relative z-[1]">
          <div className="px-5 py-20 md:py-40">{children}</div>
        </Box>
      </Box>
    </Box>
  );
}
