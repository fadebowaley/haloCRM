'use client';

import { Button } from 'rizzui';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'; // import FormProvider
import { defaultNodeData, NodeRow } from './node-data';
import toast from 'react-hot-toast';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import NodeTable from './table';

export default function NodeDataForm() {
  const methods = useForm<{ nodes: NodeRow[] }>({
    defaultValues: { nodes: defaultNodeData },
  });

  const { control, handleSubmit } = methods;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'nodes',
  });

  const onSubmit = (data: { nodes: NodeRow[] }) => {
    console.log('Submitted:', data.nodes);
    toast.success(
      <div className="flex items-center gap-2">
        <AiOutlineCheckCircle size={20} className="text-green-500" />
        <span>Nodes created successfully!</span>
      </div>
    );
  };

  const onError = () => {
    toast.error(
      <div className="flex items-center gap-2">
        <AiOutlineCloseCircle size={20} className="text-red-500" />
        <span>Failed to create nodes</span>
      </div>
    );
  };

  return (
    <FormProvider {...methods}> {/* Wrap the form in FormProvider */}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <NodeTable
          control={control}
          fields={fields}
          append={append}
          update={update}
          remove={remove}
        />

        <div className="flex justify-end">
          <Button type="submit" color="primary">
            Create Nodes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
