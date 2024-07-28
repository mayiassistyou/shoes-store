"use server";

import { PAGE_SIZE } from "@/lib/constants";
import { and, count, eq, exists, gte, ilike, lte } from "drizzle-orm";

import { db } from "..";
import { products as productTable, sizes } from "../schema";

async function getProducts(
  page: number = 1,
  limit: number = PAGE_SIZE,
  search: string = "",
  sort: "asc" | "desc" = "desc",
  sortBy: "createdAt" | "name" | "price" = "createdAt",
  from: number | undefined = undefined,
  to: number | undefined = undefined,
  brandId: number | undefined = undefined,
  size: string | undefined = undefined,
) {
  const options = (p: any) => {
    let options = [ilike(p.name, `%${search}%`)];

    if (from) {
      options = [...options, gte(p.price, from)];
    }

    if (to) {
      options = [...options, lte(p.price, to)];
    }

    if (brandId) {
      options = [...options, eq(p.brandId, brandId)];
    }

    if (size) {
      options = [
        ...options,
        exists(
          db
            .select()
            .from(sizes)
            .where(and(eq(sizes.productId, p.id), eq(sizes.size, size))),
        ),
      ];
    }

    return and(...options);
  };

  try {
    const products = await db.query.products.findMany({
      with: {
        images: true,
        brand: true,
        sizes: true,
      },
      offset: (page - 1) * limit,
      limit: limit,
      orderBy: (products, { asc, desc }) => {
        if (sort === "asc") return [asc(products[sortBy])];

        return [desc(products[sortBy])];
      },
      where: (products) => options(products),
    });

    const total = await db
      .select({ count: count() })
      .from(productTable)
      .where(options(productTable));

    return { products, total: total[0].count };
  } catch (error) {
    return { error: "Đã có lỗi xảy ra." };
  }
}

export default getProducts;
