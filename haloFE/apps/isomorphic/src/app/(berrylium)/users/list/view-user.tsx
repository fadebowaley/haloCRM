'use client';

import { useEffect, useState } from 'react';
import { useUsers } from '@lib/hooks/useUsers';
import { useModal } from '@/app/shared/modal-views/use-modal'; // make sure it's top-level
import { Input, Button, ActionIcon, Title, Badge, Box } from 'rizzui';
import { PiXBold } from 'react-icons/pi';


type ViewUserModalProps = {
  userId: string;
  onClose?: () => void;
};

export default function ViewUserModal({ userId, onClose }: ViewUserModalProps) {
  const { getUser } = useUsers(); // ✅ Hook at top level
  const modal = useModal(); // ✅ Also at top level

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const response = await getUser(userId);
        if (response.success) {
          console.log(response);
          setUser(response.data);
        }
      } catch (err) {
        console.error('Error fetching user', err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) loadUser();
  }, [userId, getUser]);

  // All hooks are above — now it's safe to conditionally render below

  if (loading) {
    return <div className="p-4 text-center">Loading user info...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center text-red-600">User not found</div>;
  }

  return (
    <Box className="max-w-3xl">
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="col-span-full flex items-center justify-between">
          <Title as="h4" className="font-semibold">
            User Details
          </Title>
          <ActionIcon size="sm" variant="text">
            <PiXBold className="h-auto w-5" />
          </ActionIcon>
        </div>

        <Input
          label="Full Name"
          value={
            user.firstname && user.lastname
              ? `${user.firstname} ${user.lastname}`
              : user.name
          }
          readOnly
          className="col-span-full"
        />

        <Input
          label="Email"
          value={user.email}
          readOnly
          className="col-span-full"
        />

        <Input
          label="Role"
          value={user.role || 'N/A'}
          disabled
          className="col-span-full"
        />

        <Input
          label="Status"
          value={user.status}
          disabled
          className="col-span-full"
        />

        {user.otpVerified ? (
          <Badge color="success">OTP Verified</Badge>
        ) : (
          <Badge color="danger">OTP Not Verified</Badge>
        )}

        <Input
          label="Created At"
          value={new Date(user.createdAt).toLocaleString()}
          readOnly
          className="col-span-full"
        />

        <Input
          label="Verification Status"
          value={user.otpVerified ? 'Verified' : 'Unverified'}
          readOnly
          className="col-span-full"
        />
      </div>
    </Box>
  );
}
