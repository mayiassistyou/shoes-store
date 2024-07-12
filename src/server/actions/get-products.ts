"use server";

import { PAGE_SIZE } from "@/lib/constants";
import { count } from "drizzle-orm";

import { db } from "..";
import { products as productTable } from "../schema";

export default async function getProducts(
  page: number = 1,
  limit: number = PAGE_SIZE,
) {
  try {
    const products = await db.query.products.findMany({
      with: {
        images: true,
        brand: true,
      },
      offset: (page - 1) * limit,
      limit: limit,
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    const total = await db.select({ count: count() }).from(productTable);

    return { products, total: total[0].count };
  } catch (error) {
    return { error: "Đã có lỗi xảy ra." };
  }
}
