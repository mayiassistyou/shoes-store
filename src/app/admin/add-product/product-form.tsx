"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InferResultType } from "@/lib/infer-type";
import { UploadDropzone } from "@/lib/uploadthing";
import { createProduct } from "@/server/actions/create-product";
import { ProductSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Tiptap from "./tiptap";

function ProductForm({
  brands,
}: {
  brands: InferResultType<"brands">[];
}): JSX.Element {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      brandId: 0,
      description: "",
      images: [],
    },
  });

  const { append, update } = useFieldArray({
    control: form.control,
    name: "images" as never,
  });
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  const { execute, status } = useAction(createProduct, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss();
      }
      if (data?.success) {
        router.push("/admin/products");

        toast.dismiss();
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Đang tạo sản phẩm...");
    },
  });

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm sản phẩm</CardTitle>
        <CardDescription>
          Thêm sản phẩm mới vào cửa hàng của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <Banknote size={36} className="rounded-md bg-muted p-2" />
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
                    <Select onValueChange={field.onChange} defaultValue="0">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn thương hiệu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Chọn thương hiệu</SelectItem>
                        {brands.map((brand) => (
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
                    <Tiptap val={field.value} />
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
                        <Image
                          key={image}
                          className="h-24 w-auto rounded-md bg-white shadow-md"
                          src={image}
                          alt="Brand Image"
                          width={50}
                          height={50}
                        />
                      ))}
                  </div>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Thêm sản phẩm
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
