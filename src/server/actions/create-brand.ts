"use server";

import { brands } from "@/server/schema";
import { BrandSchema } from "@/types/brand-schema";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

import { db } from "..";

const action = createSafeActionClient();

export const createBrand = action
  .schema(BrandSchema)
  .action(async ({ parsedInput: { title, image, description } }) => {
    try {
      const newProduct = await db
        .insert(brands)
        .values({ title, image, description })
        .returning();

      revalidatePath("/admin/brands");
      return { success: `Tạo thành công brand ${newProduct[0].title}` };
    } catch (error) {
      return { error: "Đã có lỗi xảy ra" };
    }
  });
