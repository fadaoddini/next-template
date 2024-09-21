import Image from "next/image";
import Link from "next/link"; // ایمپورت Link از next/link
import styles from "./ProductCard.module.css";
import formatNumber from '@/components/utils/FormatNumber/formatNumber';

import CountdownTimer from "@/components/utils/timer/CountdownTimer";

const ProductCard = ({ color, url }) => {
  const backgroundColor =
    color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const backgroundColorHover =
    color === "buy" ? "var(--light-green)" : "var(--light-red)";
  const textColor = color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const textColorAttr =
    color === "buy" ? "var(--darked-green)" : "var(--darked-red)";
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(fifteenDaysLater.getDate() + 15);
  const fullUrl = `${url}?color=${color}`;
  return (
    <Link href={fullUrl}> {/* لینک به صفحه مقصد */}
      <div
        className={styles.card}
        style={{
          "--bg-color": backgroundColor,
          "--text-color": textColor,
          "--border-color": backgroundColor,
          "--bg-color-hover": backgroundColorHover,
          "--text-attr": textColorAttr,
          cursor: "pointer", // تغییر ظاهر ماوس به صورت pointer
        }}
      >
        {/* تصویر مربع سمت راست */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/nopic.png" // مسیر به تصویر ذخیره شده
            alt="product"
            width={100} // اندازه ثابت مربع
            height={100}
            className={styles.image}
          />
        </div>

        {/* اطلاعات محصول سمت چپ */}
        <div className={styles.info}>
          <h2 className={styles.title}>عنوان محصول</h2>
          <p className={styles.offer}>
            بالاترین پیشنهاد: <span className={styles.green}>{formatNumber(89000)} </span>
            تومان
          </p>
          <div className={styles.details}>
            <p className={styles.detail}>
              <span className={styles.icon}>💰</span>
              <span className={styles.attr}>قیمت :</span>
              <span className={styles.bold}>{formatNumber(85000)}  </span>
              تومان
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>📦</span>
              <span className={styles.attr}>بسته‌بندی :</span>
              کارتن 5 کیلویی
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>⚖️</span>
              <span className={styles.attr}>وزن :</span>
              <span className={styles.bold}>{formatNumber(3000)}</span>
              کیلوگرم
            </p>
          </div>
        </div>
        <div className={styles.timer}>
          <CountdownTimer targetDate={fifteenDaysLater} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
