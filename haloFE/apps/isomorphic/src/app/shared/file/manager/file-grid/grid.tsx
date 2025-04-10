'use client';

import Favorite from '@/app/shared/file/manager/favorite';
import { MoreActions } from '@core/components/table-utils/more-actions';
import cn from '@core/utils/class-names';
import { Title } from 'rizzui';

export default function Grid({
  data,
  onDeleteItem,
}: {
  data: object[];
  onDeleteItem: (id: string) => void;
}) {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-5 @md:grid-cols-2 @2xl:grid-cols-3 @3xl:grid-cols-4 @7xl:grid-cols-5">
        {data?.map((item: any, index: number) => (
          <Card item={item} key={index} onDeleteItem={onDeleteItem} />
        ))}
      </div>
    </div>
  );
}

export function Card({
  item,
  onDeleteItem,
  className,
}: {
  item: any;
  onDeleteItem: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <figure className="h-7 w-7">{item.file.image}</figure>
        </div>
        <div className="flex">
          <Favorite />
          <MoreActions onDelete={() => onDeleteItem(item.id)} />
        </div>
      </div>
      <Title
        as="h4"
        className="mb-1 truncate text-sm font-medium text-gray-800"
      >
        {item?.file?.name}
      </Title>
      <ul className="flex list-inside list-disc gap-3.5">
        <li className="list-none text-sm text-gray-500">{item?.size}</li>
        <li className="text-sm text-gray-500">{item?.totalFiles} files</li>
      </ul>
    </div>
  );
}
