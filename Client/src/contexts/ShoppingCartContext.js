import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const ShoppingCartContext = createContext({});

const cartLocalStorage = JSON.parse(localStorage.getItem("cartList") || "[]");

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState(cartLocalStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemsNumber = cartItems.length;
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id, size, length) {
    return (
      cartItems.find(
        (item) =>
          (item.id === id) & (item.size === size) && item.length === length
      )?.quantity || 0
    );
  }

  function increaseCartQuantity(id, size, length, price) {
    setCartItems((currItems) => {
      if (
        currItems.find(
          (item) =>
            (item.id === id) & (item.size === size) && item.length === length
        ) == null
      ) {
        return [
          ...currItems,
          { id, size: size, length: length, price: price, quantity: 1 },
        ];
      } else {
        return currItems.map((item) => {
          if (
            (item.id === id) & (item.size === size) &&
            item.length === length
          ) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id, size, length, price) {
    setCartItems((currItems) => {
      if (
        currItems.find(
          (item) =>
            (item.id === id) & (item.size === size) && item.length === length
        ) == null
      ) {
        return [
          ...currItems,
          { id, size: size, length: length, price: price, quantity: 1 },
        ];
      } else {
        return currItems.map((item) => {
          if (
            (item.id === id) & (item.size === size) &&
            item.length === length
          ) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id, size, length) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) =>
          (item.id !== id) & (item.size !== size) && item.length !== length
      );
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        isOpen,
        cartItemsNumber,
        setIsOpen,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
