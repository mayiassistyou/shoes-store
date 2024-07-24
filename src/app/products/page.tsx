import ProductPagination from "@/components/product/pagination";
import Products from "@/components/product/products";
import { PAGE_SIZE } from "@/lib/constants";
import getProducts from "@/server/actions/get-products";

type Props = {
  searchParams: {
    page?: string;
  };
};

export const revalidate = 60 * 60;

export default async function Product({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  console.log({ page });
  const { products, total } = await getProducts(page, PAGE_SIZE);

  if (!products || products.length === 0) return <h2>Không có sản phẩm</h2>;

  return (
    <section>
      <Products products={products} />
      <ProductPagination page={page} pageSize={PAGE_SIZE} total={total} />
    </section>
  );
}
