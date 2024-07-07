"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateBrand } from "@/server/actions/update-brand";
import { BrandSchema } from "@/types/brand-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { BrandColumn } from "./columns";

function EditDialog({
  open,
  setOpen,
  brand,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  brand: BrandColumn;
}): JSX.Element {
  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      id: brand.id,
      title: brand.title,
      image: brand.image,
      description: brand.description || "",
    },
  });

  const [image, setImage] = useState<string>(brand.image);

  const { execute } = useAction(updateBrand, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      }
      setOpen(false);
    },
    onExecute: (data) => {
      toast.loading("Đang cập nhật thương hiệu...");
    },
  });

  const onSubmit = (values: z.infer<typeof BrandSchema>) => {
    execute(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Cập nhật thương hiệu</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin thương hiệu {brand.title}?
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thương hiệu</FormLabel>
                  <FormControl>
                    <Input placeholder="Nike" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <UploadDropzone
                      className="cursor-pointer border-secondary transition-all duration-500 ease-in-out hover:bg-primary/10 ut-button:bg-primary/75 ut-allowed-content:text-secondary-foreground ut-label:text-primary ut-upload-icon:text-primary/50 ut-button:ut-readying:bg-secondary"
                      endpoint="brandImageUploader"
                      onDrop={(acceptedFiles) => {
                        setImage(URL.createObjectURL(acceptedFiles[0]));
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                        return;
                      }}
                      onUploadError={(error: Error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                        return;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {image && (
                    <Image
                      className="rounded-md bg-white shadow-md"
                      src={image}
                      alt="Brand Image"
                      width={100}
                      height={100}
                    />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Thương hiệu số 1 thế giới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Huỷ
                </Button>
              </DialogClose>
              <Button type="submit">Cập nhật</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
