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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InferResultType } from "@/lib/infer-type";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateProduct } from "@/server/actions/update-product";
import { ProductSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Banknote, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Tiptap from "../add-product/tiptap";
import { ProductColumn } from "./columns";

function EditDialog({
  open,
  setOpen,
  product,
  brands,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: ProductColumn;
  brands: InferResultType<"brands">[];
}) {
  const defaultProduct = {
    id: product.id,
    name: product.name,
    images: product.images,
    price: product.price,
    brandId: product.brand.id,
    description: product.description || "",
  };

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: useMemo(() => {
      return defaultProduct;
    }, [product.id]),
  });

  const [images, setImages] = useState<string[]>(
    product.images.map((img) => img.url),
  );

  useEffect(() => {
    form.reset(defaultProduct);
    setImages(product.images.map((img) => img.url));
  }, [product.id]);

  const { append, update, remove } = useFieldArray({
    control: form.control,
    name: "images" as never,
  });

  const { execute } = useAction(updateProduct, {
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

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    execute(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-3xl max-w-5xl p-0">
        <ScrollArea className="max-h-[80vh] p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-1">
              <DialogHeader>
                <DialogTitle>Cập nhật thương hiệu</DialogTitle>
                <DialogDescription>
                  Cập nhật thông tin thương hiệu {product.name}?
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nike Vapor 15 Academy Mad Ready"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá sản phẩm</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Banknote
                          size={36}
                          className="rounded-md bg-muted p-2"
                        />
                        <Input
                          {...field}
                          type="number"
                          placeholder="Nhập giá VNĐ"
                          step="1000"
                          min={0}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thương hiệu</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={product.brand.id.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thương hiệu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Chọn thương hiệu</SelectItem>
                          {brands.map((brand: InferResultType<"brands">) => (
                            <SelectItem
                              key={brand.id}
                              value={brand.id.toString()}
                            >
                              {brand.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button asChild>
                        <Link href="/admin/add-brand">Thêm thương hiệu</Link>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Tiptap val={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình ảnh</FormLabel>
                    <FormControl>
                      <UploadDropzone
                        className="cursor-pointer border-secondary transition-all duration-500 ease-in-out hover:bg-primary/10 ut-button:bg-primary/75 ut-allowed-content:text-secondary-foreground ut-label:text-primary ut-upload-icon:text-primary/50 ut-button:ut-readying:bg-secondary"
                        endpoint="productImageUploader"
                        config={{ mode: "auto" }}
                        onUploadError={(error) => {
                          console.log(error);
                          form.setError("images", {
                            type: "validate",
                            message: error.message,
                          });
                          return;
                        }}
                        onBeforeUploadBegin={(files) => {
                          files.map((file) =>
                            append({
                              name: file.name,
                              size: file.size,
                              url: URL.createObjectURL(file),
                            }),
                          );
                          return files;
                        }}
                        onClientUploadComplete={(files) => {
                          const images = form.getValues("images");

                          images.map((field, imgIDX) => {
                            if (field.url.search("blob:") === 0) {
                              const image = files.find(
                                (img) => img.name === field.name,
                              );
                              if (image) {
                                update(imgIDX, {
                                  url: image.url,
                                  name: image.name,
                                });

                                setImages((prev) => [...prev, image.url]);
                              }
                            }
                          });
                          return;
                        }}
                      />
                    </FormControl>
                    <FormMessage />

                    <div className="flex items-end gap-2">
                      {images.length > 0 &&
                        images.map((image) => (
                          <div className="relative mt-2" key={image}>
                            <Image
                              key={image}
                              className="h-24 w-auto rounded-md bg-white shadow-md"
                              src={image}
                              alt="Brand Image"
                              width={50}
                              height={50}
                            />

                            <Button
                              type="button"
                              variant={"destructive"}
                              size="icon"
                              onClick={() => {
                                const index = images.indexOf(image);
                                remove(index);
                                setImages((prev) =>
                                  prev.filter((img) => img !== image),
                                );
                              }}
                              className="absolute -right-2 -top-2 h-4 w-4 rounded-full shadow-md"
                            >
                              <X size={8} />
                            </Button>
                          </div>
                        ))}
                    </div>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
