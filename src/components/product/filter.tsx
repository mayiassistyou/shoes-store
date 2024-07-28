"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Filter() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const FormSchema = z.object({
    search: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });

  function handleSearch(data: z.infer<typeof FormSchema>) {
    if (data.search === searchParams.get("search")) return;

    params.delete("page");
    params.delete("sort");
    params.delete("sortBy");

    if (!data.search) {
      params.delete("search");
    } else {
      params.set("search", data.search);
    }

    return router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSortChange(value: string) {
    if (value === searchParams.get("sort")) return;

    params.set("page", "1");
    params.set("sortBy", value.split("-")[0]);
    params.set("sort", value.split("-")[1]);

    return router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearch)}>
          <div className="flex items-center justify-center gap-4">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full max-w-2xl">
                  <Input
                    {...field}
                    icon={<Search size={16} />}
                    placeholder="Vapor 16 Pro ..."
                  />
                </FormItem>
              )}
            />

            <Button type="submit">Tìm kiếm</Button>
          </div>
        </form>
      </Form>
      <div className="mt-4 flex items-center justify-end gap-2">
        <h3>Sắp xếp theo: </h3>
        <Select defaultValue="createdAt-desc" onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Mới nhất</SelectItem>
            <SelectItem value="createdAt-asc">Cũ nhất</SelectItem>
            <SelectItem value="name-asc">Tên: A-Z</SelectItem>
            <SelectItem value="name-desc">Tên: Z-A</SelectItem>
            <SelectItem value="price-asc">Giá: Tăng dần</SelectItem>
            <SelectItem value="price-desc">Giá: Giảm dần</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Filter;
