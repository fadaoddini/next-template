import Image from "next/image";
import Barcode from "react-barcode";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import formatNumber from "@/components/utils/FormatNumber/formatNumber";
import CountdownTimer from "@/components/utils/timer/CountdownTimer";

const ProductCard = ({ url, title, price, weight, image, upc }) => {
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(fifteenDaysLater.getDate() + 15);

  // فرمت وزن بر اساس شرایط مشخص شده
  const formattedWeight = weight < 50 
    ? `${formatNumber(weight)} کیلوگرم`
    : `${formatNumber(weight)} گرم`;

  return (
    <Link href={url}>
      <div className={styles.card}>
        <div className={styles.circleContainer}>
          <div className={styles.halfCircle}></div>
        </div>

        {/* نمایش تصویر محصول */}
        <div className={styles.imageContainer}>
          <img
            src={image} // مسیر تصویر از props دریافت می‌شود
            alt={title}
            width={100}
            height={100}
            className={styles.image}
          />
        </div>

        {/* اطلاعات محصول */}
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.offer}>
            <Barcode
              value={String(upc)}
              format="CODE128"
              width={1.4}
              height={20}
              displayValue={false}
              background="transparent"
              lineColor="#000000"
            />
          </p>
          <div className={styles.details}>
            <p className={styles.detail}>
              <span className={styles.icon}>💰</span>
              <span className={styles.attr}>قیمت :</span>
              <span className={styles.bold}>{formatNumber(price)}</span> تومان
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>📦</span>
              <span className={styles.attr}>بسته‌بندی :</span>
              اختصاصی ربو
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>⚖️</span>
              <span className={styles.attr}>وزن :</span>
              <span className={styles.bold}>{formattedWeight}</span>
            </p>
          </div>
        </div>

        <div className={styles.timer}>ضمانت کیفیت محصول</div>
      </div>
    </Link>
  );
};

export default ProductCard;
