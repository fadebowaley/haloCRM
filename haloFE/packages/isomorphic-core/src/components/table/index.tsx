"use client";

import { isEmpty } from "lodash";
import { Fragment } from "react";
import cn from "@core/utils/class-names";
import { Box, Empty, Loader, Table, Text, Title } from "rizzui";
import { getColumnOptions } from "./util";
import { flexRender } from "@tanstack/react-table";
import { useScrollPosition } from "@core/hooks/use-Scroll-position";
import { PiCaretDownFill, PiCaretUpFill } from "react-icons/pi";
import {
  CustomBodyCellProps,
  CustomHeaderCellProps,
  MainTableProps,
  PinnedRowProps,
} from "./table-types";
import { pinningStyles } from "./table-pinning.style";

export default function MainTable<TData extends Record<string, any>>({
  table,
  dataIds,
  variant = "classic",
  classNames,
  columnOrder,
  isLoading = false,
  showLoadingText = false,
  components,
  stickyHeader = false,
}: MainTableProps<TData>) {
  const { containerRef, tableRef, isLeftScrollable, isRightScrollable } =
    useScrollPosition();

  if (!table) return null;

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[128px] flex-col items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }

  const headerParam = {
    table,
    dataIds,
    columnOrder,
    isLeftScrollable,
    isRightScrollable,
  };

  const rowParam = {
    table,
    dataIds,
    columnOrder,
    isLeftScrollable,
    isRightScrollable,
  };

  const mainRows = table.getIsSomeRowsPinned()
    ? table.getCenterRows()
    : table.getRowModel().rows;

  return (
    <>
      <Box
        ref={containerRef}
        className={cn(
          "custom-scrollbar w-full max-w-full overflow-x-auto scroll-smooth",
          stickyHeader && "max-h-[600px] overflow-y-auto",
          classNames?.container
        )}
      >
        <Table
          ref={tableRef}
          variant={variant}
          style={{
            width: table.getTotalSize(),
          }}
          className={cn(
            pinningStyles.baseStyle,
            pinningStyles.variants[variant],
            classNames?.tableClassName
          )}
        >
          <Fragment>
            {components?.header ? (
              components.header(headerParam)
            ) : (
              <Table.Header
                className={cn(
                  stickyHeader && "sticky top-0 z-10",
                  classNames?.headerClassName
                )}
              >
                {table.getHeaderGroups().map((headerGroup) => {
                  const headerCellParam = {
                    columnOrder,
                    headerGroup,
                    isLeftScrollable,
                    isRightScrollable,
                  };
                  return (
                    <Table.Row
                      key={headerGroup.id}
                      className={classNames?.rowClassName}
                    >
                      {components?.headerCell ? (
                        components.headerCell(headerCellParam)
                      ) : (
                        <TableHeadBasic
                          headerGroup={headerGroup}
                          isLeftScrollable={isLeftScrollable}
                          isRightScrollable={isRightScrollable}
                          className={classNames?.headerCellClassName}
                        />
                      )}
                    </Table.Row>
                  );
                })}
              </Table.Header>
            )}
          </Fragment>

          <Table.Body className={classNames?.bodyClassName}>
            {table.getTopRows().map((row) => (
              <PinnedRow
                key={row.id}
                row={row}
                table={table}
                isLeftScrollable={isLeftScrollable}
                isRightScrollable={isRightScrollable}
                className={classNames?.rowClassName}
                tableCellClassName={classNames?.cellClassName}
              />
            ))}

            {components?.bodyRow ? (
              components.bodyRow(rowParam)
            ) : (
              <>
                {mainRows.map((row) => (
                  <Fragment key={row.id}>
                    <Table.Row className={classNames?.rowClassName}>
                      {row.getVisibleCells().map((cell) => {
                        const bodyCellParam = {
                          cell,
                          columnOrder,
                          isLeftScrollable,
                          isRightScrollable,
                        };
                        return (
                          <Fragment key={cell.id}>
                            {components?.bodyCell ? (
                              components.bodyCell(bodyCellParam)
                            ) : (
                              <TableCellBasic
                                cell={cell}
                                isLeftScrollable={isLeftScrollable}
                                isRightScrollable={isRightScrollable}
                                className={classNames?.cellClassName}
                              />
                            )}
                          </Fragment>
                        );
                      })}
                    </Table.Row>

                    {/* custom-expanded-component start  */}
                    {components?.expandedComponent && row.getIsExpanded() && (
                      <Table.Row className={classNames?.expandedRowClassName}>
                        <Table.Cell
                          className={cn(
                            "!p-0",
                            classNames?.expandedCellClassName
                          )}
                          colSpan={row.getVisibleCells().length}
                        >
                          {components.expandedComponent(row)}
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {/* customExpandedComponent end */}
                  </Fragment>
                ))}
              </>
            )}

            {table.getBottomRows().map((row) => (
              <PinnedRow
                row={row}
                key={row.id}
                table={table}
                isLeftScrollable={isLeftScrollable}
                isRightScrollable={isRightScrollable}
                className={classNames?.rowClassName}
                tableCellClassName={classNames?.cellClassName}
              />
            ))}
          </Table.Body>
        </Table>
      </Box>

      {isEmpty(table.getRowModel().rows) && (
        <Box className="py-5 text-center lg:py-8">
          <Empty /> <Text className="mt-3">No Data</Text>
        </Box>
      )}
    </>
  );
}

// Basic Header component
export function TableHeadBasic<TData extends Record<string, any>>({
  headerGroup,
  isLeftScrollable,
  isRightScrollable,
  className,
}: CustomHeaderCellProps<TData>) {
  if (!headerGroup) return null;

  return (
    <>
      {headerGroup.headers.map((header) => {
        const { canResize, canPin, isPinned, isLeftPinned, isRightPinned } =
          getColumnOptions(header.column);

        return (
          <Table.Head
            key={header.id}
            colSpan={header.colSpan}
            style={{
              left: isLeftPinned ? header.column.getStart("left") : undefined,
              right: isRightPinned
                ? header.column.getAfter("right")
                : undefined,
              width: header.getSize(),
            }}
            className={cn(
              "group",
              isPinned && canPin && "sticky z-10",
              !isPinned && canResize && "relative",
              isPinned && isLeftScrollable && "sticky-right",
              isPinned && isRightScrollable && "sticky-left",
              className
            )}
          >
            <Box className="flex items-start">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

              {header.column.getCanSort() ? (
                <button
                  type="button"
                  onClick={header.column.getToggleSortingHandler()}
                  className="ms-1 inline-block"
                  aria-label="Sort by column"
                >
                  {{
                    asc: <PiCaretUpFill size={14} />,
                    desc: <PiCaretDownFill size={14} />,
                  }[header.column.getIsSorted() as string] ??
                    (header.column.columnDef.header !== "" && (
                      <PiCaretDownFill size={14} />
                    ))}
                </button>
              ) : null}
            </Box>

            {header.column.getCanResize() && (
              <div
                {...{
                  onDoubleClick: () => header.column.resetSize(),
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                }}
                className="absolute end-0 top-0 hidden h-full w-0.5 cursor-w-resize bg-gray-400 group-hover:block"
              />
            )}
          </Table.Head>
        );
      })}
    </>
  );
}

// Basic Cell component
export function TableCellBasic<TData extends Record<string, any>>({
  cell,
  isLeftScrollable,
  isRightScrollable,
  className,
}: CustomBodyCellProps<TData>) {
  if (!cell) return null;

  const { canResize, canPin, isPinned, isLeftPinned, isRightPinned } =
    getColumnOptions(cell.column);

  return (
    <Table.Cell
      style={{
        left: isLeftPinned ? cell!.column.getStart("left") : undefined,
        right: isRightPinned ? cell.column.getAfter("right") : undefined,
        width: cell.column.getSize(),
      }}
      className={cn(
        isPinned && canPin && "sticky z-10",
        !isPinned && canResize && "relative",
        isPinned && isLeftScrollable && "sticky-right",
        isPinned && isRightScrollable && "sticky-left",
        className
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Table.Cell>
  );
}

// Pinned Row Component
export function PinnedRow<TData extends Record<string, any>>({
  row,
  table,
  isLeftScrollable,
  isRightScrollable,
  className,
  tableCellClassName,
}: PinnedRowProps<TData>) {
  const isTopPinned = row.getIsPinned() === "top";
  const isBottomPinned = row.getIsPinned() === "bottom";
  return (
    <Table.Row
      className={cn(
        "sticky z-20 bg-white dark:bg-gray-50",
        isTopPinned && "-top-px shadow-[0px_2px_2px_0px_#0000000D]",
        isBottomPinned && "-bottom-0.5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]",
        className
      )}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <TableCellBasic
            key={cell.id}
            cell={cell}
            isLeftScrollable={isLeftScrollable}
            isRightScrollable={isRightScrollable}
            className={tableCellClassName}
          />
        );
      })}
    </Table.Row>
  );
}
