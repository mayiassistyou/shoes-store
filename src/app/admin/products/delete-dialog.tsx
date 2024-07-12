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
import { PAGE_SIZE } from "@/lib/constants";
import { deleteProduct } from "@/server/actions/delete-product";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { ProductColumn } from "./columns";

function DeleteDialog({
  open,
  setOpen,
  product,
  pageIndex,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: ProductColumn;
  pageIndex: number;
}): JSX.Element {
  const queryClient = useQueryClient();

  const { execute } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);

        queryClient.refetchQueries({
          queryKey: [
            "get-products",
            { pageIndex: pageIndex, pageSize: PAGE_SIZE },
          ],
        });
      }

      setOpen(false);
    },
    onExecute: (data) => {
      toast.loading("Đang xoá sản phẩm...");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xoá</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xoá thương hiệu {product.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Huỷ
            </Button>
          </DialogClose>
          <Button onClick={() => execute({ id: product.id })}>Xoá</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
