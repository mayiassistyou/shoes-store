"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InferResultType } from "@/lib/infer-type";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";

export type ProductColumn = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: InferResultType<"productImages">[];
  brand: InferResultType<"brands">;
};

const ActionCell = ({
  row,
  table,
}: {
  row: Row<ProductColumn>;
  table: Table<ProductColumn>;
}) => {
  const product = row.original;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        product={product}
        pageIndex={table.getState().pagination.pageIndex}
      />
      <EditDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        product={product}
        pageIndex={table.getState().pagination.pageIndex}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setEditDialogOpen(true)}
            className="cursor-pointer focus:bg-primary/50 dark:focus:bg-primary"
          >
            <Pencil size={16} className="mr-2" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="cursor-pointer text-red-700 focus:bg-destructive/50 focus:text-red-700 dark:focus:bg-destructive"
          >
            <Trash size={16} className="mr-2" /> Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "brand",
    header: "Thương hiệu",
    cell: ({ row }) => {
      return <div className="min-w-28">{row.original.brand.title}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      return (
        <div className="text-nowrap">
          {row.original.price.toLocaleString()} đ
        </div>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const productImages = row.original.images;

      return (
        <div className="grid grid-cols-4 gap-2">
          {productImages.map((image) => (
            <Image
              key={image.id}
              className="h-full w-auto p-2 dark:rounded-md dark:bg-white"
              src={image.url}
              alt={image.name}
              width={50}
              height={50}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.original.description;

      return (
        <div className="max-w-lg">
          {description && (
            <div
              className="line-clamp-3"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => <ActionCell row={row} table={table} />,
  },
];
