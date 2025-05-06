import React, { useEffect } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { Button } from 'rizzui';
import { PiPlusCircle } from 'react-icons/pi';
import DraggableRow from './DraggableRow';
import TableFooter from '@core/components/table/footer';
import Filters from './filters';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { NodeRow } from '../node-data';

export const nodeFilters = [
  {
    id: 'isMain',
    label: 'Main Node Only',
    type: 'boolean',
  },
];

type NodeFormValues = {
  nodes: NodeRow[];
};

type TableProps = {
  control: Control<NodeFormValues>;
  fields: any[];
  append: (value: any) => void;
  update: (index: number, value: any) => void;
  remove: (index: number) => void;
};

const NodeTable: React.FC<TableProps> = ({ control, fields, append, update, remove }) => {
  const nodes = useWatch({ control, name: 'nodes' });
  const [filters, setFilters] = React.useState<{ [key: string]: any }>({});

  const { table } = useTanStackTable({
    tableData: nodes,
    columnConfig: [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Address', accessorKey: 'address' },
      { header: 'City', accessorKey: 'city' },
      { header: 'State', accessorKey: 'state' },
      { header: 'Country', accessorKey: 'country' },
      { header: 'Main', accessorKey: 'isMain' },
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
        handleDeleteRow: (row: { original: NodeRow }) => {
          const indexToRemove = nodes.findIndex((r) => r.tenantId === row.original.tenantId);
          if (indexToRemove !== -1) {
            remove(indexToRemove);
          }
        },
        handleMultipleDelete: (rows: { original: NodeRow }[]) => {
          const idsToDelete = rows.map((r) => r.original.tenantId);
          [...nodes].reverse().forEach((node) => {
            if (idsToDelete.includes(node.tenantId)) {
              const index = nodes.findIndex((r) => r.tenantId === node.tenantId);
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
        filters={nodeFilters}
        onChange={(filterId, value) => setFilters((prev) => ({ ...prev, [filterId]: value }))} 
      />

      <table className="w-full table-auto border-separate border-spacing-0">
        <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="p-4">S/N</th>
            <th className="p-4">Name</th>
            <th className="p-4">Address</th>
            <th className="p-4">City</th>
            <th className="p-4">State</th>
            <th className="p-4">Country</th>
            <th className="p-4">Main</th>
            <th className="p-4 text-end w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            const currentNode = nodes[index];

            if (
              filters.isMain !== undefined &&
              Boolean(currentNode?.isMain) !== filters.isMain
            ) {
              return null;
            }

            return (
              <DraggableRow
                key={field.id}
                index={index}
                control={control}
                field={nodes[index] ?? field}
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
              address: '',
              city: '',
              state: '',
              country: '',
              isMain: true,
              isOwner: false,
              level: '',
            })
          }
        >
          <PiPlusCircle className="size-5" />
          Add Node
        </Button>
      </div>
    </div>
  );
};

export default NodeTable;
