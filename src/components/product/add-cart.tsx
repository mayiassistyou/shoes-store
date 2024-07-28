"use client";

import { InferResultType, ProductType } from "@/lib/infer-type";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

function AddCart({ product }: { product: ProductType }) {
  const { sizes } = product;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0].size);

  function handleSelectSize(size: InferResultType<"sizes">) {
    if (!size.available) return;

    setSelectedSize(size.size);
  }

  return (
    <>
      <p className="my-2 font-medium text-secondary-foreground">Kích thước</p>

      {sizes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <div
              key={size.id}
              className={cn(
                "cursor-pointer rounded-md border border-primary/[0.3] px-2 py-1",
                selectedSize === size.size &&
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
      <Button>Thêm vào giỏ hàng</Button>
    </>
  );
}

export default AddCart;
