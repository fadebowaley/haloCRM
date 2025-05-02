import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Switch } from 'rizzui';
import { FiTrash2 } from 'react-icons/fi';
import { LevelRow } from '../level-data';

type RowProps = {
  index: number;
  control: any;
  field: LevelRow;
  meta?: {
    handleDeleteRow?: () => void;
  };
};

const DraggableRow: React.FC<RowProps> = ({ index, control, field, meta }) => (
  <tr className="border-b last:border-b-0 transition-colors">
    <td className="p-4">{index + 1}</td>
    <td className="p-4">
      <Controller
        name={`levels.${index}.name`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`levels.${index}.description`}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`levels.${index}.rank`}
        control={control}
        render={({ field }) => <Input {...field} type="number" className="w-20" />}
      />
    </td>
    <td className="p-4">
      <Controller
        name={`levels.${index}.isSpecial`}
        control={control}
        render={({ field: { value, onChange, ...rest } }) => (
          <Switch
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            {...rest}
          />
        )}
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
