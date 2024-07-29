import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Variant = {
  sizeID: number;
  size: string;
  quantity: number;
};

export type CartItem = {
  id: number;
  name: string;
  image: string;
  variant: Variant;
  price: number;
  slug: string;
};

export type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.variant.sizeID === item.variant.sizeID,
          );

          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.variant.sizeID === item.variant.sizeID) {
                return {
                  ...cartItem,
                  variant: {
                    ...cartItem.variant,
                    quantity: cartItem.variant.quantity + item.variant.quantity,
                  },
                };
              }

              return cartItem;
            });

            return { cart: updatedCart };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...item,
                  variant: {
                    sizeID: item.variant.sizeID,
                    size: item.variant.size,
                    quantity: item.variant.quantity,
                  },
                },
              ],
            };
          }
        }),
      decreaseQuantity: (item) =>
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.variant.sizeID === item.variant.sizeID) {
              return {
                ...cartItem,
                variant: {
                  ...cartItem.variant,
                  quantity: cartItem.variant.quantity - 1,
                },
              };
            }
            return cartItem;
          });

          return {
            cart: updatedCart.filter((item) => item.variant.quantity > 0),
          };
        }),
      removeFromCart: (item) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (i) => i.id !== item.id || i.variant.sizeID !== item.variant.sizeID,
          );

          return {
            cart: updatedCart,
          };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" },
  ),
);
