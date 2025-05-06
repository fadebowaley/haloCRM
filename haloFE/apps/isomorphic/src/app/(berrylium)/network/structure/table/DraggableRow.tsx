import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'rizzui';
import { FiTrash2 } from 'react-icons/fi';
import { StructureRow } from '../structure-data';

type RowProps = {
  index: number;
  control: any;
  field: StructureRow;
  meta?: {
    handleDeleteRow?: () => void;
  };
};

const DraggableRow: React.FC<RowProps> = ({ index, control, field, meta }) => (
  <tr className="border-b last:border-b-0 transition-colors">
    <td className="p-4">{index + 1}</td>
    <td className="p-4">
      <Controller
        name={`structures.${index}.name`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`structures.${index}.level`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`structures.${index}.parent`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`structures.${index}.path`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`structures.${index}.description`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`structures.${index}.createdBy`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4 text-end">
      <button
        type="button"
        onClick={meta?.handleDeleteRow}
        className="text-red-500 hover:text-red-600 transition-colors"
      >
        <FiTrash2 size={18} />
      </button>
    </td>
  </tr>
);

export default DraggableRow;
