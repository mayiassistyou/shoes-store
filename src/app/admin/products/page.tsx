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
    queryKey: ["get-products"],
    queryFn: () => getProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductTable />
    </HydrationBoundary>
  );
}

export default AdminProducts;
