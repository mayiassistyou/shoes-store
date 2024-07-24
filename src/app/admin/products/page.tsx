import AppPagination from "@/components/app-pagination";
import DataTable from "@/components/ui/data-table";
import { PAGE_SIZE } from "@/lib/constants";
import getProducts from "@/server/actions/get-products";

import { columns } from "./columns";

export const revalidate = 60 * 60;

type Props = {
  searchParams: {
    page?: string;
  };
};

async function AdminProducts({ searchParams }: Props): Promise<JSX.Element> {
  const page = Number(searchParams?.page) || 1;
  const { products, total } = await getProducts(page, PAGE_SIZE);

  if (!products || products.length === 0) return <h2>Không có sản phẩm</h2>;

  return (
    <section>
      <DataTable
        columns={columns}
        data={products}
        title="Danh sách sản phẩm"
        description="Chỉnh sửa, xoá và cập nhật sản phẩm 💯"
      />

      <AppPagination page={page} pageSize={PAGE_SIZE} total={total} />
    </section>
  );
}

export default AdminProducts;
