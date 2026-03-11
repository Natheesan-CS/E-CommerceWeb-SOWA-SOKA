import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);

    if (existing) {
      // Do nothing, quantity can only be changed in the Cart page
      alert(`${product.name} is already in the cart.`);
      return;
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, qty) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ✅ CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  // TOTAL
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
