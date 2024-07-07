import DataTable from "@/components/ui/data-table";
import { db } from "@/server";

import { columns } from "./columns";

async function Brands(): Promise<JSX.Element> {
  const brands = await db.query.brands.findMany();

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
