"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBrand } from "@/server/actions/delete-brand";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { BrandColumn } from "./columns";

function DeleteDialog({
  open,
  setOpen,
  brand,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  brand: BrandColumn;
}): JSX.Element {
  const { execute } = useAction(deleteBrand, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Đang xoá thương hiệu...");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xoá</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xoá thương hiệu {brand.title}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Huỷ
            </Button>
          </DialogClose>
          <Button onClick={() => execute({ id: brand.id })}>Xoá</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
