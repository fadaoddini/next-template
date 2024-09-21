import { useRouter } from "next/router";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleBuyDetails.module.css"; // وارد کردن استایل
import DesCardBazar from "@/components/bazar/DesCardBazar/DesCardBazar";
import CardBgImageByButton from "@/components/CardBgImageByButton/CardBgImageByButton";
import ProductCard from "@/components/bazar/ItemCardBazar/vertical/ProductCard";
import AnimatedButton from "@/components/utils/Button/AnimatedButton";

const DesktopHomePage = () => {
  const router = useRouter();
  const { color } = router.query; // دریافت پارامتر color از URL
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <AnimatedButton
            title="ثبت درخواست محصول"
            href="/learn-more"
            color="green"
          />
          <AnimatedButton
            title="ثبت فروش محصول"
            href="/contact"
            color="orange"
          />
          <DesCardBazar
            color={color}
            imageSrc="/images/mazafati.jpg"
            title="خرمای نوع فلان "
            link="/bazar/chart"
            description="این یک توضیح نمونه برای کارت است که به حداکثر 4 خط محدود می‌شود.این یک توضیح نمونه برای کارت است که به حداکثر 4 خط محدود می‌شود. توضیحات بیشتر می‌تواند در اینجا قرار گیرد."
          />
        </div>
        <div className={styles.main}>
          <div className={styles.gridContainer}>
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
            <ProductCard color={color} url="/bazar/single" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
