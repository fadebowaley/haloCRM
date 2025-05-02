import React, { useEffect, useMemo } from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { Button } from 'rizzui';
import { PiPlusCircle } from 'react-icons/pi';
import DraggableRow from './DraggableRow';
import TableFooter from '@core/components/table/footer';
import Filters from './filters';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { LevelRow } from '../level-data';

export const levelFilters = [
  {
    id: 'isSpecial',
    label: 'Special Only',
    type: 'boolean',
  },
];

type LevelFormValues = {
  levels: LevelRow[];
};

type TableProps = {
  control: Control<LevelFormValues>;
  fields: any[];
  append: (value: any) => void;
  update: (index: number, value: any) => void;
  remove: (index: number) => void;
};

const LevelTable: React.FC<TableProps> = ({ control, fields, append, update, remove }) => {
  const levels = useWatch({ control, name: 'levels' });
  const [filters, setFilters] = React.useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (levels) {
      const updates: { index: number; value: LevelRow }[] = [];
      
      levels.forEach((level, index) => {
        if (!level.isSpecial) {
          const otherRanks = levels
            .filter((l, i) => i !== index && !l.isSpecial)
            .map(l => l.rank);

          if (otherRanks.includes(level.rank)) {
            let newRank = 1;
            while (otherRanks.includes(newRank)) newRank++;
            updates.push({ index, value: { ...level, rank: newRank } });
          }
        }
      });

      if (updates.length > 0) {
        updates.forEach(({ index, value }) => {
          update(index, value);
        });
      }
    }
  }, [levels, update]);

  const { table } = useTanStackTable({
    tableData: levels,
    columnConfig: [
      { header: 'Tenant ID', accessorKey: 'tenantId' },
      { header: 'Name', accessorKey: 'name' },
      {
        header: 'Description',
        accessorKey: 'description',
        size: 400,
        minSize: 150,
        maxSize: 600,
      },
      { header: 'Rank', accessorKey: 'rank' },
      { header: 'Special', accessorKey: 'isSpecial' },
    ],
    options: {
      enableColumnResizing: true,
      columnResizeMode: 'onChange',
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row: { original: LevelRow }) => {
          const indexToRemove = levels.findIndex((r) => r.tenantId === row.original.tenantId);
          if (indexToRemove !== -1) {
            remove(indexToRemove);
          }
        },
        handleMultipleDelete: (rows: { original: LevelRow }[]) => {
          const tenantIdsToDelete = rows.map((r) => r.original.tenantId);
          [...levels]
            .reverse()
            .forEach((level) => {
              if (tenantIdsToDelete.includes(level.tenantId)) {
                const index = levels.findIndex((r) => r.tenantId === level.tenantId);
                if (index !== -1) remove(index);
              }
            });
        },
      },
    },
  });

  return (
    <div className="relative mt-12 overflow-hidden">
      <Filters
        filters={levelFilters}
        onChange={(filterId, value) => setFilters((prev) => ({ ...prev, [filterId]: value }))}
      />

      <table className="w-full table-auto border-separate border-spacing-0">
        <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="p-4">S/N</th>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Rank</th>
            <th className="p-4">Special</th>
            <th className="p-4 text-end w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            const currentLevel = levels[index];

            if (
              filters.isSpecial !== undefined &&
              Boolean(currentLevel?.isSpecial) !== filters.isSpecial
            ) {
              return null;
            }

            return (
              <DraggableRow
                key={field.id}
                index={index}
                control={control}
                field={currentLevel}
                meta={{
                  handleDeleteRow: () => remove(index),
                }}
              />
            );
          })}
        </tbody>
      </table>

      <TableFooter table={table} />

      <div className="flex justify-start p-4">
        <Button
          type="button"
          variant="text"
          className="flex items-center gap-2 text-primary"
          onClick={() =>
            append({
              tenantId: Date.now().toString(),
              name: '',
              description: '',
              rank: fields.filter(f => !f.isSpecial).length + 1,
              isSpecial: false,
            })
          }
        >
          <PiPlusCircle className="size-5" />
          Add Level
        </Button>
      </div>
    </div>
  );
};

export default LevelTable;
