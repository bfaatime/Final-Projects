import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import WishlistProvider from './context/wishlistContext.jsx';
import { CartProvider } from './context/cartContext'; // CartProvider'ı import ettik

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <CartProvider> {/* CartProvider'ı WishlistProvider'ın üstüne koyduk */}
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </HelmetProvider>
  </BrowserRouter>
);
