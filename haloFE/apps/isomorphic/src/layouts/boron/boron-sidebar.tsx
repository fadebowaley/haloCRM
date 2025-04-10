import Logo from '@core/components/logo';
import cn from '@core/utils/class-names';
import Link from 'next/link';
import { BoronSidebarMenu } from './boron-sidebar-menu';

export default function BoronSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 top-[72px] z-50 h-full w-[270px] border-r border-muted bg-white dark:bg-gray-100/50 2xl:top-20 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 xl:hidden 2xl:px-8 2xl:pt-6">
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>
      <div className="custom-scrollbar overflow-y-auto scroll-smooth h-[calc(100%-80px)]">
        <BoronSidebarMenu />
      </div>
    </aside>
  );
}
