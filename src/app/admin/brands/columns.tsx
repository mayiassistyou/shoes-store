"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";

export type BrandColumn = {
  id: number;
  title: string;
  description: string | null;
  image: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const ActionCell = ({ row }: { row: Row<BrandColumn> }) => {
  const brand = row.original;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        brand={brand}
      />
      <EditDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        brand={brand}
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

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "title",
    header: "Tên",
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      return (
        <Image
          className="h-full w-auto p-2 dark:rounded-md dark:bg-white"
          src={row.getValue("image")}
          alt={row.getValue("title")}
          width={50}
          height={50}
        />
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
