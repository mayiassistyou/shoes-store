"use client";

import { useCartStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

function CartButton() {
  const { cart } = useCartStore();

  return (
    <div className="relative px-2">
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.span
            animate={{ scale: 1, opacity: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ scale: 0 }}
            className="absolute -right-0.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white dark:bg-primary"
          >
            {cart.length}
          </motion.span>
        )}
      </AnimatePresence>
      <ShoppingBag />
    </div>
  );
}

export default CartButton;
