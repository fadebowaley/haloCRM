// import Header from '@/app/multi-step/header';

// export default function MultiStepLayoutTwo({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#136A8A] to-[#267871] @container">
//       <Header />
//       {children}
//     </div>
//   );
// }
'use client';

import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

export default function MultiStepLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex">
      <BerylLiumLayout>
        {/* Ensure this layout does not have the background applied to it */}
        <div className="flex-1 bg-gradient-to-r from-[#136A8A] to-[#267871]">{children}</div>
      </BerylLiumLayout>
    </div>
  );
}
