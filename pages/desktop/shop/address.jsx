import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShopCart.module.css"; // وارد کردن استایل
import Address from "@/components/shop/address/Address";


const Shop = () => {
    
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        
        <div className={styles.main}>
        <Address />
        </div>
        
      </div>
    </div>
  );
};

export default Shop;
