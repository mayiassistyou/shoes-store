import AppPagination from "@/components/app-pagination";
import Filter from "@/components/product/filter";
import Products from "@/components/product/products";
import Sidebar from "@/components/product/sidebar";
import { PAGE_SIZE } from "@/lib/constants";
import { getBrands } from "@/server/actions/get-brands";
import getProducts from "@/server/actions/get-products";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    sort?: "asc" | "desc";
    sortBy?: "createdAt" | "name" | "price";
    from?: string;
    to?: string;
    brand?: string;
    size?: string;
  };
};

export const revalidate = 60 * 60;

export default async function Product({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const sort = searchParams?.sort || "desc";
  const sortBy = searchParams?.sortBy || "createdAt";
  const from = Number(searchParams?.from) || undefined;
  const to = Number(searchParams?.to) || undefined;
  const brand = Number(searchParams?.brand) || undefined;
  const size = searchParams?.size || undefined;

  const { brands } = await getBrands();

  const { products, total } = await getProducts(
    page,
    PAGE_SIZE,
    search,
    sort,
    sortBy,
    from,
    to,
    brand,
    size,
  );

  return (
    <section>
      <Filter />
      <Sidebar brands={brands || []} />
      <div className="md:ml-56">
        <Products products={products} />
        <AppPagination page={page} pageSize={PAGE_SIZE} total={total} />
      </div>
    </section>
  );
}
