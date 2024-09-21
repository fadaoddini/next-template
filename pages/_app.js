import "@/styles/globals.css";
import { CartProvider } from "@/components/shop/cart/CartContext"; 
import { AddToCartProvider } from "@/components/shop/utils/AddToCartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <AddToCartProvider>
        <ToastContainer /> {/* اضافه کردن ToastContainer */}
        <Component {...pageProps} />
      </AddToCartProvider>
    </CartProvider>
  );
}
