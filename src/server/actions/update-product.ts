"use server";

import { ProductSchema } from "@/types/product-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { productImages, products } from "../schema";

const action = createSafeActionClient();

export const updateProduct = action
  .schema(ProductSchema)
  .action(
    async ({
      parsedInput: { id, name, price, images, description, brandId },
    }) => {
      try {
        if (!id) return { error: "Không tìm thấy thương hiệu" };

        const currentBrand = await db.query.products.findFirst({
          where: eq(products.id, id),
        });

        if (!currentBrand) return { error: "Không tìm thấy thương hiệu" };

        await db.delete(productImages).where(eq(productImages.productId, id));

        await db.insert(productImages).values(
          images.map((image, index) => ({
            ...image,
            order: index,
            productId: id,
          })),
        );

        const editedProduct = await db
          .update(products)
          .set({ name, price, description, brandId, updatedAt: new Date() })
          .where(eq(products.id, id))
          .returning();

        revalidatePath("/admin/product");

        return {
          success: `Cập nhật sản phẩm ${editedProduct[0].name} thành công!`,
        };
      } catch (error) {
        return { error: "Đã có lỗi xảy ra. Vui lòng thử lại." };
      }
    },
  );
