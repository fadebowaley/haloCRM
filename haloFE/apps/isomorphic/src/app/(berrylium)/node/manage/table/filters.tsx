'use client';

import { nodeFilters } from './index'; // Import the nodeFilters array
import { Box, Button, Flex, Input, Text, Title } from 'rizzui';
import { PiMagnifyingGlassBold, PiTrashDuotone } from 'react-icons/pi';
import { type Table as ReactTableType } from '@tanstack/react-table';
import StatusField from '@core/components/controlled-table/status-field';

interface FiltersProps {
  filters: { id: string; label: string; type: string; value?: boolean }[]; // Include value in the filter structure
  onChange: (filterId: string, value: any) => void; // Define the structure of onChange prop
}

export default function Filters({ filters, onChange }: FiltersProps) {
  const isFiltered = filters.some(filter => filter.value !== undefined);

  return (
    <Box className="mb-4 @container">
      <Flex
        gap="3"
        align="center"
        justify="between"
        className="w-full flex-wrap @4xl:flex-nowrap"
      >
        <Title
          as="h3"
          className="rizzui-title-h3 order-1 whitespace-nowrap pe-4 text-base font-semibold sm:text-lg"
        >
          All Nodes
        </Title>
        <Flex
          align="center"
          direction="col"
          gap="2"
          className="order-4 @lg:grid @lg:grid-cols-2 @4xl:order-2 @4xl:flex @4xl:flex-row"
        >
          {/* Filters */}
          {filters.map(filter => (
            <StatusField
              key={filter.id}
              placeholder={`Filter by ${filter.label}`}
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              value={filter.value !== undefined ? (filter.value ? 'Yes' : 'No') : ''}
              onChange={(e) => onChange(filter.id, e === 'Yes')}
              getOptionValue={(option) => option.value}
              dropdownClassName="!z-10 h-auto"
              className="@4xl:w-40"
              getOptionDisplayValue={(option) => option.value}
              displayValue={(selected: string) => selected}
            />
          ))}

          {isFiltered && (
            <Button
              size="sm"
              onClick={() => onChange('isMain', undefined)} // Reset all filters
              variant="flat"
              className="h-9 w-full bg-gray-200/70 @lg:col-span-full @4xl:w-auto"
            >
              <PiTrashDuotone className="me-1.5 size-[17px]" /> Clear Filters
            </Button>
          )}
        </Flex>
        <Input
          type="search"
          clearable={true}
          placeholder="Search for nodes..."
          className="order-3 h-9 w-full @2xl:order-2 @2xl:ms-auto @2xl:h-auto @2xl:max-w-60 @4xl:order-3"
        />
      </Flex>
    </Box>
  );
}
