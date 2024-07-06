"use client";

import { Button } from "@/components/ui/button";
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
import { createBrand } from "@/server/actions/create-brand";
import { BrandSchema } from "@/types/brand-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function BrandForm(): JSX.Element {
  const router = useRouter();
  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const { execute, status } = useAction(createBrand, {
    onSuccess: ({ data }) => {
      console.log({ data });
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        router.push("/admin/brands");

        toast.dismiss();
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Đang tạo thương hiệu...");
    },
  });

  function onSubmit(values: z.infer<typeof BrandSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  endpoint="imageUploader"
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
                  onUploadBegin={(name) => {
                    // Do something once upload begins
                    console.log("Uploading: ", name);
                  }}
                  onDrop={(acceptedFiles) => {
                    // Do something with the accepted files
                    console.log("Accepted files: ", acceptedFiles);
                  }}
                />
              </FormControl>
              <FormMessage />
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
                <Textarea placeholder="Thương hiệu số 1 thế giới" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Thêm thương hiệu
        </Button>
      </form>
    </Form>
  );
}

export default BrandForm;
