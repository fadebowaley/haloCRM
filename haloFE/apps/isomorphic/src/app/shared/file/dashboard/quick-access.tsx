'use client';

import Link from 'next/link';
import cn from '@core/utils/class-names';
import { Title, Text, Button, Flex } from 'rizzui';
import XMLIcon from '@core/components/icons/xml-solid';
import PDFIcon from '@core/components/icons/pdf-solid';
import DocIcon from '@core/components/icons/doc-solid';
import ImageIcon from '@core/components/icons/image-solid';
import FolderIcon from '@core/components/icons/folder-solid';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';

const mockData = [
  {
    id: 1,
    file: {
      name: 'Employee Sheet',
      image: FolderIcon,
    },
  },
  {
    id: 2,
    file: {
      name: 'Employee history.pdf',
      image: PDFIcon,
    },
  },
  {
    id: 3,
    file: {
      name: 'Final Changes.doc',
      image: DocIcon,
    },
  },
  {
    id: 4,
    file: {
      name: 'Office Setup.img',
      image: ImageIcon,
    },
  },
  {
    id: 5,
    file: {
      name: 'Salary Statement.xls',
      image: XMLIcon,
    },
  },
];

export default function QuickAccess({ className }: { className?: string }) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div className={className}>
      <div className="col-span-full mb-3 flex items-center justify-between 2xl:mb-5">
        <Title as="h3" className="text-lg font-semibold xl:text-xl">
          Quick Access
        </Title>
        <Link
          href={'/file-manager'}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="relative">
        <Button
          title="Prev"
          variant="text"
          ref={sliderPrevBtn}
          onClick={() => scrollToTheLeft()}
          className="!absolute left-0 top-0 z-10 !h-full w-14 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
        >
          <PiCaretLeftBold className="size-5" />
        </Button>
        <div className="w-full overflow-hidden">
          <div
            ref={sliderEl}
            className="custom-scrollbar grid grid-flow-col gap-5 overflow-x-auto scroll-smooth"
          >
            {mockData.map((item) => {
              return <QuickAccessCard key={item.id} item={item} />;
            })}
          </div>
        </div>
        <Button
          title="Next"
          variant="text"
          ref={sliderNextBtn}
          onClick={() => scrollToTheRight()}
          className="!absolute right-0 top-0 z-10 !h-full w-14 !justify-end rounded-none bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
        >
          <PiCaretRightBold className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export function QuickAccessCard({
  item,
  className,
}: {
  item: any;
  className?: string;
}) {
  return (
    <Flex
      justify="center"
      align="center"
      direction="col"
      className={cn(
        className,
        'relative rounded-lg bg-gray-50 p-7 dark:bg-gray-100/50'
      )}
    >
      {item?.file?.image && (
        <div className="w-14">
          <item.file.image />
        </div>
      )}
      <Text className="mt-5 w-full truncate text-center text-sm font-medium text-gray-700">
        {item?.file?.name}
      </Text>
    </Flex>
  );
}
