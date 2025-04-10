import WorkSpaceSwitcher from '@/layouts/carbon/work-space-switcher';
import Logo from '@core/components/logo';
import cn from '@core/utils/class-names';
import Link from 'next/link';
import { SidebarMenu } from '../hydrogen/sidebar-menu';

export function CarbonDrawerSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <div className="custom-scrollbar overflow-y-auto scroll-smooth h-[calc(100%-144px)]">
        <SidebarMenu />
      </div>

      <div className="relative bg-gray-0 px-6 pb-3 pt-1 dark:bg-gray-100">
        <WorkSpaceSwitcher
          dropdownClassName="max-w-[270px]"
          selectClassName="border-0 border-t-2 border-gray-200 rounded-none"
          suffixClassName="rotate-180"
        />
      </div>
    </aside>
  );
}
