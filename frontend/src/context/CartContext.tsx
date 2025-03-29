import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

//Context file that allows us to interact with the cart across different pages
//Provides the functions to add to the cart, remove an item from the cart, and clear the cart entirely
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((b) => b.bookId === item.bookId);
      const updatedCart = prevCart.map((b) =>
        b.bookId === item.bookId
          ? {
              ...b,
              price: b.price + item.price,
              quantity: b.quantity + item.quantity,
            }
          : b
      );
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((b) => b.bookId !== bookId));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
