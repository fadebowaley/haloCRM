// components/EditUser.tsx
'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { useState } from 'react';
import { Form } from '@core/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { Controller } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { roles, statuses, permissions } from '../utils';
import {
  CreateUserInput,
  createUserSchema,
} from '@/validators/create-user.schema';

export default function EditUser({ user }: { user: CreateUserInput }) {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data: CreateUserInput) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Updated user', data);
      setLoading(false);
      closeModal();
    }, 600);
  };

  return (
    <Form<CreateUserInput>
      defaultValues={user}
      onSubmit={onSubmit}
      validationSchema={createUserSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="col-span-full flex items-center justify-between">
            <Title as="h4">Edit User</Title>
            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>

          <Input
            label="Full Name"
            {...register('fullName')}
            error={errors.fullName?.message}
          />
          <Input
            label="Email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Role"
                options={roles}
                error={errors.role?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Status"
                options={statuses}
                error={errors.status?.message}
              />
            )}
          />

          <Controller
            name="permissions"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Permissions" options={permissions} />
            )}
          />

          <div className="col-span-full flex justify-end gap-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
