import DataTable from "@/components/ui/data-table";
import { getBrands } from "@/server/actions/get-brands";

import { columns } from "./columns";

async function Brands(): Promise<JSX.Element> {
  const response = await getBrands();
  const brands = response.brands || [];

  return (
    <div>
      <DataTable
        columns={columns}
        data={brands}
        title="Danh sách thương hiệu"
        description="Chỉnh sửa, xoá và cập nhật thương hiệu 💯"
      />
    </div>
  );
}

export default Brands;
