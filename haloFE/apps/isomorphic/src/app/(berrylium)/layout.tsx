'use client';

import { useIsMounted } from '@core/hooks/use-is-mounted';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  // Since only BERYLLIUM layout is available, we can directly return it
  return <BerylLiumLayout>{children}</BerylLiumLayout>;
}
