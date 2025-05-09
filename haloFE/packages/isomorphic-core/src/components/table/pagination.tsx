"use client";

import { type Table as ReactTableType } from "@tanstack/react-table";

import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Select,
  SelectOption,
  Text,
} from "rizzui";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from "react-icons/pi";
import cn from "@core/utils/class-names";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
];


export default function TablePagination<TData extends Record<string, any>>({
  table,
  showSelectedCount = false,
  className,
  totalPages, // optional totalPages prop
}: {
  table: ReactTableType<TData>;
  showSelectedCount?: boolean;
  className?: string;
  totalPages?: number;
}) {
  // Use totalPages if provided, otherwise fallback to table.getPageCount()
  const pagesCount = totalPages ?? table.getPageCount();
  //const pageCount = table.getPageCount();

  return (
    <Flex
      gap="6"
      align="center"
      justify="between"
      className={cn("@container", className)}>
      <Flex align="center" className="w-auto shrink-0">
        <Text className="hidden font-normal text-gray-600 @md:block">
          Rows per page
        </Text>
        <Select
          size="sm"
          variant="flat"
          options={options}
          className="w-12"
          value={table.getState().pagination.pageSize}
          onChange={(v: SelectOption) => {
            table.setPageSize(Number(v.value));
          }}
          suffixClassName="[&>svg]:size-3"
          selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
          optionClassName="font-medium text-xs px-2 justify-center"
        />
      </Flex>
      {showSelectedCount && (
        <Box className="hidden @2xl:block w-full">
          <Text>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </Text>
        </Box>
      )}
      <Flex justify="end" align="center">
        <Text className="hidden font-normal text-gray-600 @3xl:block">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {pagesCount.toLocaleString()}
        </Text>
        <Grid gap="2" columns="4">
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            // onClick={() => setPageIndex(0)}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
            <PiCaretDoubleLeftBold className="size-3.5" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
            <PiCaretLeftBold className="size-3.5" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
            <PiCaretRightBold className="size-3.5" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
            <PiCaretDoubleRightBold className="size-3.5" />
          </ActionIcon>
        </Grid>
      </Flex>
      <Flex>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(v) => table.setPageSize(Number(v.value))}
          options={[5, 10, 15, 20].map((n) => ({ value: n, label: `${n}` }))}
        />
        {/* nav buttons */}
        <ActionIcon
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}>
          ⏮
        </ActionIcon>
        <ActionIcon
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          ◀
        </ActionIcon>
        <Text>
          Page {table.getState().pagination.pageIndex + 1} of {pagesCount}
        </Text>
        <ActionIcon
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          ▶
        </ActionIcon>
        <ActionIcon
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}>
          ⏭
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
// "use client";

// import { type Table as ReactTableType } from "@tanstack/react-table";
// import {
//   ActionIcon,
//   Box,
//   Flex,
//   Grid,
//   Select,
//   SelectOption,
//   Text,
// } from "rizzui";
// import {
//   PiCaretLeftBold,
//   PiCaretRightBold,
//   PiCaretDoubleLeftBold,
//   PiCaretDoubleRightBold,
// } from "react-icons/pi";
// import cn from "@core/utils/class-names";

// const options = [
//   { value: 5, label: "5" },
//   { value: 10, label: "10" },
//   { value: 15, label: "15" },
//   { value: 20, label: "20" },
//   { value: 25, label: "25" },
// ];

// export default function TablePagination<TData extends Record<string, any>>({
//   table,
//   showSelectedCount = false,
//   className,
// }: {
//   table: ReactTableType<TData>;
//   showSelectedCount?: boolean;
//   className?: string;
// }) {
//   const pagesCount = table.getPageCount();
//   const currentPage = table.getState().pagination.pageIndex;

//   console.log('Pg count look-up', pagesCount)

//   // Calculate navigation ability based on totalPages
//   const canPreviousPage = currentPage > 0;
//   const canNextPage = currentPage < pagesCount - 1;

//   return (
//     <Flex
//       gap="6"
//       align="center"
//       justify="between"
//       className={cn("@container", className)}>
//       <Flex align="center" className="w-auto shrink-0">
//         <Text className="hidden font-normal text-gray-600 @md:block">
//           Rows per page
//         </Text>
//         <Select
//           size="sm"
//           variant="flat"
//           options={options}
//           className="w-12"
//           value={table.getState().pagination.pageSize}
//           onChange={(v: SelectOption) => {
//             table.setPageSize(Number(v.value));
//           }}
//           suffixClassName="[&>svg]:size-3"
//           selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
//           optionClassName="font-medium text-xs px-2 justify-center"
//         />
//       </Flex>
//       {showSelectedCount && (
//         <Box className="hidden @2xl:block w-full">
//           <Text>
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </Text>
//         </Box>
//       )}
//       <Flex justify="end" align="center">
//         <Text className="hidden font-normal text-gray-600 @3xl:block">
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {pagesCount.toLocaleString()}
//         </Text>
//         <Grid gap="2" columns="4">
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to first page"
//             onClick={() => table.firstPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
//             <PiCaretDoubleLeftBold className="size-3.5" />
//           </ActionIcon>
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to previous page"
//             onClick={() => table.previousPage()}
//             disabled={!canPreviousPage}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
//             <PiCaretLeftBold className="size-3.5" />
//           </ActionIcon>
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to next page"
//             onClick={() => table.nextPage()}
//             disabled={!canNextPage}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
//             <PiCaretRightBold className="size-3.5" />
//           </ActionIcon>
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to last page"
//             onClick={() => table.lastPage()}
//             disabled={!canNextPage}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none">
//             <PiCaretDoubleRightBold className="size-3.5" />
//           </ActionIcon>
//         </Grid>
//       </Flex>
//     </Flex>
//   );
// }
