import formatPrice from "@/lib/format-price";
import { ProductType } from "@/lib/infer-type";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";

function Products({ products }: { products: ProductType[] }) {
  return (
    <main className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          className="py-2"
          href={`/products/${product.slug}`}
        >
          <Image
            className="aspect-square rounded-md pb-2"
            src={product.images[0].url}
            width={300}
            height={300}
            alt={product.name}
            loading="lazy"
          />

          <div className="mt-2 font-medium">
            <h2>{product.name}</h2>
            <p className="my-2 text-sm text-muted-foreground">
              {product.brand.title}
            </p>
          </div>
          <div>
            <Badge className="text-sm" variant={"secondary"}>
              {formatPrice(product.price)}
            </Badge>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Products;
