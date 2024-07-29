"use client";

import formatPrice from "@/lib/format-price";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import emptyCart from "@public/empty-cart.json";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { MinusCircle, PackageSearch, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCartStore();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price! * item.variant.quantity;
    }, 0);
  }, [cart]);

  const priceInLetters = useMemo(() => {
    return formatPrice(totalPrice)
      .split("")
      .map((letter) => {
        return { letter, id: createId() };
      });
  }, [totalPrice]);

  return (
    <section>
      <h2 className="mb-4 text-2xl">Giỏ hàng</h2>
      {cart.length === 0 && (
        <div className="mt-8 flex w-full flex-col items-center justify-center">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Lottie className="my-8 h-64" animationData={emptyCart} />
            <h2 className="mb-2 text-center text-xl text-muted-foreground">
              Giỏ hàng trống
            </h2>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Tiếp tục mua sắm
            </Link>
          </motion.div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="lg:w-2/3">
            <Table className="mx-auto w-full">
              <TableHeader>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell className="hidden lg:inline">Giá</TableCell>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.map((item) => (
                  <TableRow key={(item.id + item.variant.sizeID).toString()}>
                    <TableCell>
                      <Link href={`/products/${item.slug}`}>{item.name}</Link>

                      <p className="mt-4 lg:hidden">
                        Giá: {formatPrice(item.price)}
                      </p>
                    </TableCell>
                    <TableCell className="hidden lg:inline">
                      <p>{formatPrice(item.price)}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Image
                          className="rounded-md"
                          width={48}
                          height={48}
                          src={item.image}
                          alt={item.name}
                          priority
                        />
                      </div>
                    </TableCell>
                    <TableCell>{item.variant.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <MinusCircle
                          onClick={() => {
                            decreaseQuantity({
                              ...item,
                              variant: {
                                sizeID: item.variant.sizeID,
                                size: item.variant.size,
                                quantity: 1,
                              },
                            });
                          }}
                          className="cursor-pointer transition-colors duration-300 hover:text-muted-foreground"
                          size={14}
                        />
                        <p className="text-md font-bold">
                          {item.variant.quantity}
                        </p>
                        <PlusCircle
                          className="cursor-pointer transition-colors duration-300 hover:text-muted-foreground"
                          onClick={() => {
                            addToCart({
                              ...item,
                              variant: {
                                sizeID: item.variant.sizeID,
                                size: item.variant.size,
                                quantity: 1,
                              },
                            });
                          }}
                          size={14}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Trash2
                        className="cursor-pointer transition-colors duration-300 hover:text-muted-foreground"
                        onClick={() => {
                          removeFromCart({
                            ...item,
                          });
                        }}
                        size={14}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm hover:text-muted-foreground"
            >
              <PackageSearch size="16" /> Tiếp tục mua sắm
            </Link>
          </div>
          <Card className="lg:w-1/3">
            <CardContent className="my-4">
              <motion.div className="relative flex items-center justify-between overflow-hidden">
                <h3 className="font-medium">Tổng cộng</h3>

                <AnimatePresence mode="popLayout">
                  <div className="flex">
                    {priceInLetters.map((letter, i) => (
                      <motion.div key={letter.id}>
                        <motion.span
                          initial={{ y: 40 }}
                          animate={{ y: 0 }}
                          exit={{ y: -40 }}
                          transition={{ delay: i * 0.1 }}
                          className="inline-block text-2xl text-primary"
                        >
                          {letter.letter}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </motion.div>

              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-8 w-full",
                )}
              >
                Thanh toán
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}

export default Cart;
