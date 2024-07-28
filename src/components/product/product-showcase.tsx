"use client";

import { InferResultType } from "@/lib/infer-type";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

function ProductShowcase({
  images,
}: {
  images: InferResultType<"productImages">[];
}) {
  const [activeThumbnail, setActiveThumbnail] = useState([0]);
  const [api, setApi] = useState<CarouselApi>();

  const updatePreview = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem
            key={image.url}
            className="flex aspect-square items-center justify-center overflow-hidden rounded-md"
          >
            {image.url ? (
              <Image
                priority
                className="rounded-md"
                width={1280}
                height={720}
                src={image.url}
                alt={image.name}
              />
            ) : null}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-2 overflow-clip py-2">
        {images.map((image, index) => (
          <div
            key={image.url}
            className="flex aspect-square items-center justify-center overflow-hidden rounded-md"
          >
            {image.url ? (
              <Image
                onClick={() => updatePreview(index)}
                priority
                className={cn(
                  index === activeThumbnail[0] ? "opacity-100" : "opacity-75",
                  "cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:opacity-75",
                )}
                width={72}
                height={48}
                src={image.url}
                alt={image.name}
              />
            ) : null}
          </div>
        ))}
      </div>
    </Carousel>
  );
}

export default ProductShowcase;
