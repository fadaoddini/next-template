import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import formatNumber from '@/components/utils/FormatNumber/formatNumber';
import CountdownTimer from "@/components/utils/timer/CountdownTimer";

const ProductCard = ({ color, url, title, description, price, top_price_bid, weight, packaging, imageSrc, finished_time }) => {
  const backgroundColor = color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const backgroundColorHover = color === "buy" ? "var(--light-green)" : "var(--light-red)";
  const textColor = color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const textColorAttr = color === "buy" ? "var(--darked-green)" : "var(--darked-red)";

  return (
    <Link href={url}>
      <div
        className={styles.card}
        style={{
          "--bg-color": backgroundColor,
          "--text-color": textColor,
          "--border-color": backgroundColor,
          "--bg-color-hover": backgroundColorHover,
          "--text-attr": textColorAttr,
          cursor: "pointer",
        }}
      >
        {/* تصویر محصول */}
        <div className={styles.imageContainer}>
          <img
            src={imageSrc}
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
            بالاترین پیشنهاد: <span className={styles.green}>{formatNumber(top_price_bid)}</span>
            تومان
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
              {packaging}
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>⚖️</span>
              <span className={styles.attr}>وزن :</span>
              <span className={styles.bold}>{formatNumber(weight)}</span> کیلوگرم
            </p>
          </div>
        </div>
        <div className={styles.timer}>
          <CountdownTimer targetDate={new Date(finished_time)} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
