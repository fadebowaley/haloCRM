'use client';

import Logo from '@core/components/logo';
import { useMedia } from '@core/hooks/use-media';
import cn from '@core/utils/class-names';
import Link from 'next/link';
import { Button } from 'rizzui';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  return (
    <header
      className={cn(
        'flex w-full items-center justify-between bg-white px-4 py-5 dark:bg-gray-0 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <Link
        aria-label="Site Logo"
        href={'/'}
        className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 md:w-[155px] lg:me-5 xl:block"
      >
        <Logo iconOnly={isMobile} className="w-full" />
      </Link>
      <div className="flex items-center gap-2">
        <Button
          size="lg"
          rounded="lg"
          variant="outline"
          className="gap-2 whitespace-nowrap"
        >
          Save & Exit
        </Button>
      </div>
    </header>
  );
}
