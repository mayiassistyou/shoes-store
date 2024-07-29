"use client";

import { InferResultType, ProductType } from "@/lib/infer-type";
import { CartItem, useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";

function AddCart({ product }: { product: ProductType }) {
  const { sizes } = product;
  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  function handleSelectSize(size: InferResultType<"sizes">) {
    if (!size.available) return;

    setSelectedSize(size);
  }

  function handleAddToCart() {
    if (!sizes || sizes.length === 0) return;

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      variant: {
        sizeID: selectedSize.id,
        size: selectedSize.size,
        quantity,
      },
      slug: product.slug,
    };

    addToCart(item);
    toast.success(`Thêm sản phẩm ${product.name} vào giỏ hàng thành công!`);
  }

  return (
    <>
      {sizes.length > 0 && (
        <>
          <p className="my-2 font-medium text-secondary-foreground">
            Kích thước
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div
                key={size.id}
                className={cn(
                  "cursor-pointer rounded-md border border-primary/[0.3] px-2 py-1",
                  selectedSize.id === size.id &&
                    "border-primary/[0.7] bg-primary/[0.3]",
                  !size.available
                    ? "cursor-not-allowed opacity-40"
                    : "hover:bg-primary/[0.3]",
                )}
                onClick={() => handleSelectSize(size)}
              >
                {size.size}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="my-4 flex items-center justify-stretch gap-4">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button variant={"secondary"} className="flex-1">
          Số lượng: {quantity}
        </Button>
        <Button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button disabled={!sizes || sizes.length === 0} onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </Button>
    </>
  );
}

export default AddCart;
