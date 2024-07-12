import { PAGE_SIZE } from "@/lib/constants";
import getProducts from "@/server/actions/get-products";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import ProductTable from "./table";

async function AdminProducts(): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      "get-products",
      {
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      },
    ],
    queryFn: () => getProducts(1, PAGE_SIZE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductTable />
    </HydrationBoundary>
  );
}

export default AdminProducts;
