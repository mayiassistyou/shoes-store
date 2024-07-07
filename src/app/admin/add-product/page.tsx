import { getBrands } from "@/server/actions/get-brands";

import ProductForm from "./product-form";

async function AddProduct(): Promise<JSX.Element> {
  const response = await getBrands();
  const brands = response.brands || [];

  return <ProductForm brands={brands} />;
}

export default AddProduct;
