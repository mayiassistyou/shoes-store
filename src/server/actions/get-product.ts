"use server";

import { eq } from "drizzle-orm";

import { db } from "..";

async function getProduct(slug: string) {
  try {
    const product = await db.query.products.findFirst({
      with: {
        images: true,
        brand: true,
        sizes: true,
      },
      where: (product) => eq(product.slug, slug),
    });

    return { product };
  } catch (error) {
    return { error: "Đã có lỗi xảy ra." };
  }
}

export default getProduct;
