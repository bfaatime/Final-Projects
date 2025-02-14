import { createContext, useContext, useState } from "react";

// Sepet context'ini oluşturuyoruz
const CartContext = createContext();

// CartProvider bileşeni
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Sepete ürün ekleme
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item._id === product._id);

    if (productInCart) {
      // Eğer ürün zaten sepetteyse, miktarı artırıyoruz
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Ürün sepette yoksa, sepete ekliyoruz
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Sepetten ürün silme
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  // Miktarı değiştirme ve sıfır ise silme
  const changeQuantity = (productId, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId) {
          const newQuantity = Math.max(0, item.quantity + change);
          if (newQuantity === 0) {
            // Miktar sıfır olursa ürünü sepette tutmuyoruz
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item !== null); // Null olan ürünleri filtreliyoruz
      return updatedCart;
    });
  };

  // Sepeti temizleme
  const clearCart = () => setCart([]);

  // Toplam fiyat hesaplama
  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity; // Her ürünün fiyatını miktarıyla çarpıyoruz
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// CartContext'i kullanmak için bu hook'u kullanıyoruz
export const useCart = () => useContext(CartContext);
