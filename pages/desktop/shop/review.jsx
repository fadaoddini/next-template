import Review from "@/components/shop/cart/Review";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShopCart.module.css"; // وارد کردن استایل


const Shop = () => {
    
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        
        <div className={styles.main}>
        <Review />
        </div>
        
      </div>
    </div>
  );
};

export default Shop;
