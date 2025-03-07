import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const useCart = create(
  persist<CartState>(
    (set, get) => ({
      cart: [], // Default empty cart

      addToCart: (product) => {
        const { cart } = get();
        const existingProduct = cart.find((item) => item.id === product.id);
        const updatedCart = existingProduct
          ? cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...cart, { ...product, quantity: 1 }];

        set({ cart: updatedCart });
      },

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

      clearCart: () => set({ cart: [] }),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    { name: "cart-storage" } // Auto-saves cart to localStorage
  )
);
