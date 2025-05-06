'use client';

import { useIsMounted } from '@core/hooks/use-is-mounted';
import { FiSave } from 'react-icons/fi';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null; // Ensure this doesn't render until mounted
  }

  return (
    <header
      className={cn(
        'flex w-full justify-end px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          rounded="pill"
          variant="outline"
          className="gap-2 whitespace-nowrap text-white hover:border-white hover:bg-white hover:text-black"
        >
          <FiSave className="h-4 w-4" />
          Save & Exit
        </Button>
      </div>
    </header>
  );
}
