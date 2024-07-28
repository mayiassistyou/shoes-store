import AddCart from "@/components/product/add-cart";
import ProductShowcase from "@/components/product/product-showcase";
import { Separator } from "@/components/ui/separator";
import formatPrice from "@/lib/format-price";
import getProduct from "@/server/actions/get-product";
import getProducts from "@/server/actions/get-products";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const { products } = await getProducts();

  if (!products) return [];
  const slugs = products.map((product) => product.slug);

  return slugs;
}

async function Product({ params }: Props): Promise<JSX.Element> {
  const { slug } = params;
  const { product } = await getProduct(slug);

  if (!product) return <h2>Product not found</h2>;

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:gap-12">
      <div className="flex-1">
        <ProductShowcase images={product.images} />
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="text-2xl font-bold">{product.name}</h2>

        <Separator className="my-2" />

        <p className="py-2 text-2xl font-medium">
          {formatPrice(product.price)}
        </p>
        {product.description && (
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        )}

        <AddCart product={product} />
      </div>
    </section>
  );
}
export default Product;
