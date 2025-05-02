// components/StructureDataForm.tsx
'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from 'rizzui';
import StructureTable from './table';
import { StructureRow } from './structure-data'

export default function StructureDataForm() {
  const { control, handleSubmit } = useForm<{ structures: StructureRow[] }>({
    defaultValues: { structures: [] },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'structures',
  });

  const onSubmit = (data: { structures: StructureRow[] }) => {
    const withRanks = data.structures.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
    console.log('Submitted:', withRanks);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <StructureTable
        control={control}
        fields={fields}
        append={append}
        update={update}
        remove={remove}
      />

      <div className="flex justify-end ">
        <Button type="submit" color="primary">
          Create Structures
        </Button>
      </div>
    </form>
  );
}
