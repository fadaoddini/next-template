import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShop.module.css"; // وارد کردن استایل
import ProductCard from "@/components/shop/ProductCard";
import AnimatedButton from "@/components/utils/Button/AnimatedButton";

const Shop = () => {
  
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <AnimatedButton
            title="ثبت درخواست نمایندگی"
            href="/learn-more"
            color="green"
          />
          
        </div>
        <div className={styles.main}>
          <div className={styles.gridContainer}>
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            <ProductCard  url="/shop/single" />
            
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
