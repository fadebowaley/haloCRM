'use client';

import {
  MultiSelectOption,
  Select,
  SelectOption,
  SelectProps,
  Text,
} from 'rizzui';
import { socialMediaOptions } from '@/data/social-media-dashboard-data';
import { PiCheck, PiPlusCircle } from 'react-icons/pi';
import cn from '@core/utils/class-names';

export function SocialMediaFilter({
  value,
  onChange,
  ...props
}: Omit<SelectProps<SelectOption>, 'options'>) {
  return (
    <Select
      value={value}
      className="w-36"
      onChange={onChange}
      selectClassName="ring-0 h-9"
      options={socialMediaOptions}
      displayValue={(op: SelectOption) => renderCustomSocialOption(op)}
      getOptionDisplayValue={(op) => renderCustomSocialOption(op)}
      {...props}
    />
  );
}

export function renderCustomSocialOption(op: SelectOption) {
  const Icon = op.icon;
  return (
    <span className="flex items-center gap-2">
      <Icon className="size-4 shrink-0" />
      <Text>{op.label}</Text>
    </span>
  );
}

export function renderCustomSocialMultiOption(
  option: MultiSelectOption,
  selected: boolean
) {
  const Icon = option.icon;
  return (
    <div className={cn('flex w-full items-center gap-3 py-1')}>
      <Icon className="size-5" />
      <Text fontWeight="medium">{option.label}</Text>
      {selected && <PiCheck className="ms-auto size-5" />}
    </div>
  );
}

export function renderDisplayValue(
  selectedItems: string[],
  options: MultiSelectOption[],
  handleClearItem?: (value: string) => void
) {
  const filteredItems = options.filter((option) =>
    selectedItems.includes(option.value)
  );
  const isEmpty = filteredItems.length === 0;
  // const isLongerThanOne = filteredItems.length > 1;

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center gap-2 text-start',
        !isEmpty && 'me-6'
      )}
    >
      <div className="flex items-center gap-1 pe-2">
        <PiPlusCircle className="size-5 text-muted-foreground" />
        Social
      </div>
      {!isEmpty && (
        <span className="border-s border-muted ps-2">
          {filteredItems.length} Selected
        </span>
      )}
    </div>
  );
}

export function GetSocialOption({ platform }: { platform: string }) {
  const selected = socialMediaOptions.find(
    (op) => op.value.toLowerCase() === platform.toLowerCase()
  );

  return renderCustomSocialOption(selected!);
}
