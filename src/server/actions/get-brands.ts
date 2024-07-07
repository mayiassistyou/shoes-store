"use server";

import { db } from "..";

export async function getBrands() {
  try {
    const brands = await db.query.brands.findMany();

    return { brands };
  } catch (error) {
    return { error: "Failed to get brands" };
  }
}
