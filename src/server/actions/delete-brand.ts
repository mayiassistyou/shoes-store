"use server";

import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { db } from "..";
import { brands } from "../schema";

const action = createSafeActionClient();

export const deleteBrand = action
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const data = await db.delete(brands).where(eq(brands.id, id)).returning();
      revalidatePath("/admin/brands");

      return { success: `Xoá thương hiệu ${data[0].title} thành công!` };
    } catch (error) {
      return { error: "Đã có lỗi xảy ra. Vui lòng thử lại." };
    }
  });
