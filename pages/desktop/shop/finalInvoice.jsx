import FinalInvoice from "@/components/shop/cart/FinalInvoice";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShopCart.module.css"; // وارد کردن استایل

const Shop = () => {
  return (
    <div className={styles.container}>
      <div className={styles.desktop}>
        <DesktopNavBar />
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <FinalInvoice />
        </div>
      </div>
    </div>
  );
};

export default Shop;
