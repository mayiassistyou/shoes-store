"use server";

import { productImages, products } from "@/server/schema";
import { ProductSchema } from "@/types/product-schema";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

import { db } from "..";

const action = createSafeActionClient();

export const createProduct = action
  .schema(ProductSchema)
  .action(
    async ({ parsedInput: { name, description, price, images, brandId } }) => {
      try {
        const slug = name.toLowerCase().replace(/ /g, "-");

        const newProduct = await db
          .insert(products)
          .values({
            name,
            brandId,
            price,
            description,
            slug,
          })
          .returning();

        await db
          .insert(productImages)
          .values(
            images.map((image, index) => ({
              productId: newProduct[0].id,
              name: image.name,
              url: image.url,
              order: index,
            })),
          )
          .returning();

        revalidatePath("/admin/products");
        return { success: `Tạo sản phẩm ${newProduct[0].name} thành công` };
      } catch (error) {
        console.log({ error });

        return { error: "Đã có lỗi xảy ra" };
      }
    },
  );
