'use client';

import { useEffect, useState } from 'react';
import { useUsers } from '@hooks/useUsers';
import { usersColumns } from './columns';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import Table from '@core/components/table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';

export type UsersTableDataType = {
  id: string;
  userId: string; // HaloId
  firstname: string;
  lastname: string;
  fullName: string;
  email: string;
  avatar: string;
  status: string;
  roles: string[];
  isOwner: boolean;
  isAgreed: boolean;
  isSuper: boolean;
  createdBy: string | null;
  otpVerified: boolean;
  isEmailVerified: boolean;
  deletedAt: string | null;
  tenantId: string;
  createdAt: string;
};

export default function UsersTable() {
  const { getUsers, softDeleteUser, deleteUser } = useUsers();

 const [pageIndex, setPageIndex] = useState(0);
 const [pageSize, setPageSize] = useState(10);

  const { table, setData } = useTanStackTable<UsersTableDataType>({
    tableData : [],
    columnConfig: usersColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex,
          pageSize,
        },
      },


      meta: {
        handleDeleteRow: async (id) => {
          const res = await deleteUser(id);
          if (res.success) {
            setData((prev) => prev.filter((r) => r.id !== id));
            table.resetRowSelection();
          }
        },

        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {


      const res = await getUsers({ page: pageIndex + 1, limit: pageSize });
      if (res.success && res.data?.results) {
        console.log(res.data.results);
        const formattedData: UsersTableDataType[] = res.data.results.map(
          (user: any) => ({
            id: user.id,
            userId: user.haloId,
            fullName: `${user.firstname} ${user.lastname}`,
            email: user.email,
            otpVerified: user.otpVerified,
            avatar: user.avatar,
            roles: user.roles?.length ? user.roles.map((r: any) => r.name) : [],
            isOwner: user.isOwner,
            isSuper: user.isSuper,
            createdBy: user.createdBy || null,
            isEmailVerified: user.isEmailVerified,
            deletedAt: user.deletedAt || null,
            tenantId: user.tenantId, 
            createdAt: user.createdAt || new Date().toISOString(),
            status: user.status ? 'Active' : 'Pending',
          })
        );
        // Deduplicate roles and statuses

        setData(formattedData);
      }

    };

    fetchUsers();
  }, [getUsers, setData]);

  return (
    <div className="mt-14">

      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </div>
  );
}