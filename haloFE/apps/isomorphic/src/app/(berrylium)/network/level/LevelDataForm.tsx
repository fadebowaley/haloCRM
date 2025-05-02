import { Button } from 'rizzui';
import { useForm, useFieldArray } from 'react-hook-form';
import { defaultData, LevelRow } from './level-data';
import toast from 'react-hot-toast';
import { AiOutlineCheckCircle } from 'react-icons/ai';  // Success icon
import { AiOutlineCloseCircle } from 'react-icons/ai';  // Error icon
import LevelTable from './table';

export default function LevelDataForm() {
  const { control, handleSubmit } = useForm<{ levels: LevelRow[] }>({
    defaultValues: { levels: defaultData },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'levels',
  });

  const onSubmit = (data: { levels: LevelRow[] }) => {
    console.log('Submitted:', data.levels);
    toast.success(
      <div className="flex items-center gap-2">
        <AiOutlineCheckCircle size={20} className="text-green-500" />
        <span>Levels created successfully!</span>
      </div>
    );
  };

  const onError = () => {
    toast.error(
      <div className="flex items-center gap-2">
        <AiOutlineCloseCircle size={20} className="text-red-500" />
        <span>Failed to create levels</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <LevelTable control={control} fields={fields} append={append} update={update} remove={remove} />

      <div className="flex justify-end">
        <Button type="submit" color="primary">
          Create Levels
        </Button>
      </div>
    </form>
  );
}
