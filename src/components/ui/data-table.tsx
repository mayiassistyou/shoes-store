"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  description: string;
  hasPagination?: boolean;
  total?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState> | undefined;
}

function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  hasPagination = false,
  total,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    rowCount: total,
    state: {
      pagination,
    },
    manualPagination: hasPagination,
    onPaginationChange,
  });

  const lastPage =
    (total && pagination && Math.ceil(total / pagination.pageSize)) || 0;
  const pageIndex = pagination?.pageIndex || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="align-top">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {hasPagination && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                {table.getCanPreviousPage() && (
                  <PaginationPrevious onClick={() => table.previousPage()} />
                )}
              </PaginationItem>
              {pageIndex > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => table.setPageIndex(0)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {pageIndex > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pageIndex > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageIndex - 2)}
                  >
                    {Number(pageIndex - 1)}
                  </PaginationLink>
                </PaginationItem>
              )}
              {pageIndex > 0 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageIndex - 1)}
                  >
                    {Number(pageIndex)}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink isActive>
                  {Number(pageIndex) + 1}
                </PaginationLink>
              </PaginationItem>
              {pageIndex < lastPage - 2 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageIndex + 1)}
                  >
                    {Number(pageIndex) + 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              {pageIndex < lastPage - 3 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageIndex + 2)}
                  >
                    {Number(pageIndex) + 3}
                  </PaginationLink>
                </PaginationItem>
              )}
              {pageIndex < lastPage - 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pageIndex < lastPage - 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(lastPage - 1)}
                  >
                    {lastPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {table.getCanNextPage() && (
                <PaginationItem>
                  <PaginationNext onClick={() => table.nextPage()} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}

export default DataTable;
