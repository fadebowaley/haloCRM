import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { Button } from 'rizzui';
import { PiPlusCircle } from 'react-icons/pi';
import DraggableRow from './DraggableRow';
import TableFooter from '@core/components/table/footer';
import Filters from './filters';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { StructureRow } from '../structure-data';

export const structureFilters = [];

type StructureFormValues = {
  structures: StructureRow[];
};

type TableProps = {
  control: Control<StructureFormValues>;
  fields: any[];
  append: (item: any) => void;
  update: (index: number, data: any) => void;
  remove: (index: number) => void;
};

const StructureTable: React.FC<TableProps> = ({ control, fields, append, update, remove }) => {
  const structures = useWatch({ control, name: 'structures' });
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const { table } = useTanStackTable({
    tableData: structures ?? [],
    columnConfig: [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Level', accessorKey: 'level' },
      { header: 'Parent', accessorKey: 'parent' },
      { header: 'Path', accessorKey: 'path' },
      { header: 'Description', accessorKey: 'description', size: 400 },
      { header: 'Created By', accessorKey: 'createdBy' },
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
        handleDeleteRow: (row: { original: StructureRow }) => {
          const indexToRemove = structures.findIndex((r) => r.tenantId === row.original.tenantId);
          if (indexToRemove !== -1) {
            remove(indexToRemove);
          }
        },
        handleMultipleDelete: (rows: { original: StructureRow }[]) => {
          const tenantIdsToDelete = rows.map((r) => r.original.tenantId);
          [...structures]
            .reverse()
            .forEach((structure) => {
              if (tenantIdsToDelete.includes(structure.tenantId)) {
                const index = structures.findIndex((r) => r.tenantId === structure.tenantId);
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
        filters={structureFilters}
        onChange={(filterId, value) => setFilters((prev) => ({ ...prev, [filterId]: value }))}
      />

      <table className="w-full table-auto border-separate border-spacing-0">
        <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="p-4">S/N</th>
            <th className="p-4">Name</th>
            <th className="p-4">Level</th>
            <th className="p-4">Parent</th>
            <th className="p-4">Path</th>
            <th className="p-4">Description</th>
            <th className="p-4">Created By</th>
            <th className="p-4 text-end w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            const currentStructure = structures[index];

            return (
              <DraggableRow
                key={field.id}
                index={index}
                control={control}
                field={currentStructure}
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
              level: '',
              parent: '',
              path: '',
              description: '',
              createdBy: '',
            })
          }
        >
          <PiPlusCircle className="size-5" />
          Add Structure
        </Button>
      </div>
    </div>
  );
};

export default StructureTable;
