"use server";

import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { db } from "..";
import { productImages, products } from "../schema";

const action = createSafeActionClient();

export const deleteProduct = action
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.delete(productImages).where(eq(productImages.productId, id));

      const data = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();
      revalidatePath("/admin/products");

      return { success: `Xoá sản phẩm ${data[0].name} thành công!` };
    } catch (error) {
      return { error: "Đã có lỗi xảy ra. Vui lòng thử lại." };
    }
  });
