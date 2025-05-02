import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'rizzui';
import { Switch } from 'rizzui';
import { Button } from 'rizzui';
import { FiTrash2 } from 'react-icons/fi';

type NodeRowProps = {
  index: number;
  field: any;
  control: any;
  meta?: {
    handleDeleteRow: () => void;
  };
};

const DraggableRow: React.FC<NodeRowProps> = ({ index, field, control, meta }) => {
  // Ensure that `useFormContext` is being used inside a form context provided by FormProvider
  const { control: formControl } = useFormContext();

  return (
    <tr key={field.id} className="group border-b border-gray-200 hover:bg-gray-50">
      <td className="p-4">{index + 1}</td>

      <td className="p-4">
        <Input {...formControl.register(`nodes.${index}.name`)} defaultValue={field.name} placeholder="Name" />
      </td>

      <td className="p-4">
        <Input {...formControl.register(`nodes.${index}.address`)} defaultValue={field.address} placeholder="Address" />
      </td>

      <td className="p-4">
        <Input {...formControl.register(`nodes.${index}.city`)} defaultValue={field.city} placeholder="City" />
      </td>

      <td className="p-4">
        <Input {...formControl.register(`nodes.${index}.state`)} defaultValue={field.state} placeholder="State" />
      </td>

      <td className="p-4">
        <Input {...formControl.register(`nodes.${index}.country`)} defaultValue={field.country} placeholder="Country" />
      </td>

      <td className="p-4">
        <Controller
          name={`nodes.${index}.isMain`}
          control={formControl}
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
};

export default DraggableRow;
