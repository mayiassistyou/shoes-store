"use client";

import { InferResultType } from "@/lib/infer-type";
import { Infer } from "next/dist/compiled/superstruct";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const sizes = ["38", "38.5", "39", "39.5", "40", "40.5", "41", "41.5", "42"];
const priceFilters = [
  { value: "0", from: null, to: null },
  { value: "1", from: "0", to: "1000000" },
  { value: "2", from: "1000000", to: "2000000" },
  { value: "3", from: "2000000", to: "3000000" },
  { value: "4", from: "3000000", to: "5000000" },
  { value: "5", from: "5000000", to: null },
];

function Sidebar({ brands }: { brands: InferResultType<"brands">[] }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  let priceFilter =
    priceFilters.find(({ from, to }) => {
      return from === fromParam && to === toParam;
    })?.value || "0";

  function changePriceFilterParams(from: string | null, to: string | null) {
    if (!to && !from) {
      if (!fromParam && !toParam) return;

      params.delete("from");
      params.delete("to");
    } else {
      if (fromParam === from && toParam === to) return;

      from ? params.set("from", from) : params.delete("from");
      to ? params.set("to", to) : params.delete("to");
    }
  }

  function handleFilterPrice(value: string) {
    const priceFilter = priceFilters.find((filter) => filter.value === value);

    if (!priceFilter) return;

    const { from, to } = priceFilter;
    changePriceFilterParams(from, to);
    params.delete("page");

    return router.replace(`${pathname}?${params.toString()}`);
  }

  function handleFilterBrand(value: string) {
    if (value === searchParams.get("brand")) return;

    if (value === "0") {
      params.delete("brand");
    } else {
      params.set("brand", value);
    }
    params.delete("page");

    return router.replace(`${pathname}?${params.toString()}`);
  }

  function handleChangeSizeFilter(value: string) {
    if (value === searchParams.get("size")) return;

    if (value === "0") {
      params.delete("size");
    } else {
      params.set("size", value);
    }

    params.delete("page");

    return router.replace(`${pathname}?${params}`);
  }

  return (
    <div className="float-left hidden w-56 pr-4 md:block">
      <h3 className="mb-2 text-xl uppercase">Tìm kiếm theo</h3>

      <Accordion
        type="multiple"
        defaultValue={["price", "brand", "size"]}
        className="w-full"
      >
        <AccordionItem value="price">
          <AccordionTrigger>Giá</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={priceFilter}
              onValueChange={handleFilterPrice}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">Tất cả</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">0 ~ 1.000.000 VNĐ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">1.000.000 ~ 2.000.000 VNĐ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">2.000.000 ~ 3.000.000 VNĐ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">3.000.000 ~ 5.000.000 VNĐ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Trên 5.000.000 VNĐ</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Thương hiệu</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={searchParams.get("brand") || "0"}
              onValueChange={handleFilterBrand}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">Tất cả</Label>
              </div>
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={brand.id.toString()}
                    id={brand.id.toString()}
                  />
                  <Label htmlFor={brand.id.toString()}>{brand.title}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={searchParams.get("size") || "0"}
              onValueChange={handleChangeSizeFilter}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">Tất cả</Label>
              </div>
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={size} />
                  <Label htmlFor={size}>{size}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Sidebar;
