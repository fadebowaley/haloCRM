'use client';

import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { socialMediaOptions } from '@/data/social-media-dashboard-data';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useState } from 'react';
import { Flex, MultiSelect } from 'rizzui';
import { renderCustomSocialMultiOption, renderDisplayValue } from '../utils';

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
  className?: string;
}

export default function Filters<TData extends Record<string, any>>({
  table,
  className,
}: TableToolbarProps<TData>) {
  const [state, setState] = useState([socialMediaOptions[0].value]);
  return (
    <Flex align="center" justify="end" className={className}>
      <MultiSelect
        value={state}
        onChange={setState}
        options={socialMediaOptions}
        placeholder="Select Platform.."
        displayValue={renderDisplayValue}
        selectClassName="ring-0 min-h-[35px] h-[35px]"
        dropdownClassName="min-w-40"
        placement="bottom-end"
        selectedItemClassName="hidden first:block border-0"
        getOptionDisplayValue={renderCustomSocialMultiOption}
      />
      <ToggleColumns table={table} />
    </Flex>
  );
}
