import Cart from "@/components/shop/cart/Cart";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShopCart.module.css"; // وارد کردن استایل


const Shop = () => {
    
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        
        <div className={styles.main}>
        <Cart />
        </div>
        
      </div>
    </div>
  );
};

export default Shop;
