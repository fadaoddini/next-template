import Cart from "@/components/shop/cart/Cart";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShopSingle.module.css"; // وارد کردن استایل
import SingleShop from "@/components/shop/single/SingleShop"


const Shop = () => {
    const fakeImages = [
        "/images/mazafati.jpg",
        "/images/rabbi.jpg",
        "/images/piarom1.jpg",
      ];
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        
        <div className={styles.main}>
        <SingleShop
              images={fakeImages}
              description="این یک توضیحات فیک است."
              qrValue="https://example.com"
            />
        </div>
        <div className={styles.left}>
         
          
        </div>
      </div>
    </div>
  );
};

export default Shop;
