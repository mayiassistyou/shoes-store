"use client";

import DataTable from "@/components/ui/data-table";
import { PAGE_SIZE, STALE_TIME } from "@/lib/constants";
import getProducts from "@/server/actions/get-products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "./columns";

function ProductTable(): JSX.Element {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const { data } = useQuery({
    queryKey: ["get-products", pagination],
    queryFn: () => getProducts(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME,
  });

  return (
    <DataTable
      columns={columns}
      data={data?.products || []}
      title="Danh sách sản phẩm"
      description="Chỉnh sửa, xoá và cập nhật sản phẩm 💯"
      hasPagination
      total={data?.total}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}

export default ProductTable;
