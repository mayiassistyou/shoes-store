"use server";

import { BrandSchema } from "@/types/brand-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { brands } from "../schema";

const action = createSafeActionClient();

export const updateBrand = action
  .schema(BrandSchema)
  .action(async ({ parsedInput: { id, title, image, description } }) => {
    try {
      if (!id) return { error: "Không tìm thấy thương hiệu" };

      const currentBrand = await db.query.brands.findFirst({
        where: eq(brands.id, id),
      });

      if (!currentBrand) return { error: "Không tìm thấy thương hiệu" };

      const editedProduct = await db
        .update(brands)
        .set({ title, image, description, updatedAt: new Date() })
        .where(eq(brands.id, id))
        .returning();

      revalidatePath("/admin/brands");

      return {
        success: `Cập nhật thương hiệu ${editedProduct[0].title} thành công!`,
      };
    } catch (error) {
      return { error: "Đã có lỗi xảy ra. Vui lòng thử lại." };
    }
  });
