'use client';

import { usersData } from '@/data/users-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { usersColumns } from './columns';
import Table from '@core/components/table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';

export type UsersTableDataType = (typeof usersData)[number];
export default function UsersTable() {
  const { table, setData } = useTanStackTable<UsersTableDataType>({
    tableData: usersData,
    columnConfig: usersColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <div className="mt-14">
      <Filters table={table} />
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


// User ID -  "HaloId": "0LSv0ITAdG
// Name -   "firstname": "John Doe", "lastname": "John Doe","email": "morp6@gmail.com.com",
// Role - "roles": [],
// Created : 
// Verification - "otpVerified": false,
// Status - status

/***
 * {
    "results": [
        {
            "roles": [],
            "isOwner": true,
            "isAgreed": true,
            "isSuper": false,
            "createdBy": null,
            "otp": null,
            "otpExpires": null,
            "otpVerified": true,
            "isEmailVerified": false,
            "deletedAt": null,
            "firstname": "John Doe",
            "lastname": "John Doe",
            "email": "johndoe@example.com",
            "userId": "0LSv0ITAdG",
            "tenantId": "bce76jne6F",
            "id": "680ab0be19685413ab6e5c2f"
        },
        {
            "roles": [],
            "isOwner": false,
            "isAgreed": false,
            "isSuper": false,
            "createdBy": "680ab0be19685413ab6e5c2f",
            "otp": null,
            "otpExpires": null,
            "otpVerified": false,
            "isEmailVerified": false,
            "deletedAt": null,
            "firstname": "John Doe",
            "lastname": "John Doe",
            "email": "morp6@gmail.com.com",
            "userId": "vNgozRC2qP",
            "tenantId": "bce76jne6F",
            "id": "680ab25919685413ab6e5c71"
        },
        {
            "roles": [],
            "isOwner": false,
            "isAgreed": false,
            "isSuper": false,
            "createdBy": "680ab0be19685413ab6e5c2f",
            "otp": null,
            "otpExpires": null,
            "otpVerified": false,
            "isEmailVerified": false,
            "deletedAt": null,
            "firstname": "John Doe",
            "lastname": "John Doe",
            "email": "m0rp6@gmail.com.com",
            "userId": "orp6LhS3Jz",
            "tenantId": "bce76jne6F",
            "id": "680ab25f19685413ab6e5c76"
        }
    ],
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "totalResults": 3
 *
 *
 */



// 'use client';

// import { useEffect, useState } from 'react';
// import { useUsers } from '@/app/lib/hooks/useUsers';
// import { usersColumns } from './columns';
// import Table from '@core/components/table';
// import TableFooter from '@core/components/table/footer';
// import TablePagination from '@core/components/table/pagination';
// import Filters from './filters';
// import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';

// export default function UsersTable() {
//   const [usersData, setUsersData] = useState([]);
//   const { getUsers, deleteUser } = useUsers();

//   const { table, setData } = useTanStackTable({
//     tableData: usersData,
//     columnConfig: usersColumns,
//     options: {
//       initialState: {
//         pagination: {
//           pageIndex: 0,
//           pageSize: 10,
//         },
//       },
//       meta: {
//         handleDeleteRow: async (row) => {
//           const confirmed = confirm(
//             'Are you sure you want to delete this user?'
//           );
//           if (!confirmed) return;

//           const result = await deleteUser(row.id);
//           if (result.success) {
//             setData((prev) => prev.filter((r) => r.id !== row.id));
//             table.resetRowSelection();
//           }
//         },
//         handleMultipleDelete: async (rows) => {
//           const confirmed = confirm('Delete selected users?');
//           if (!confirmed) return;

//           for (const row of rows) {
//             await deleteUser(row.id); // optionally debounce or batch this
//           }

//           setData((prev) => prev.filter((r) => !rows.includes(r)));
//           table.resetRowSelection();
//         },
//       },
//       enableColumnResizing: false,
//     },
//   });

//   // Fetch users on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getUsers();
//       if (response.success) {
//         setUsersData(response.data);
//         setData(response.data);
//       }
//     };

//     fetchData();
//   }, [getUsers, setData]);

//   return (
//     <div className="mt-14">
//       <Filters table={table} />
//       <Table
//         table={table}
//         variant="modern"
//         classNames={{
//           container: 'border border-muted rounded-md',
//           rowClassName: 'last:border-0',
//         }}
//       />
//       <TableFooter table={table} />
//       <TablePagination table={table} className="py-4" />
//     </div>
//   );
// }
