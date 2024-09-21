import Image from "next/image";
import Barcode from "react-barcode";
import Link from "next/link"; // ایمپورت Link از next/link
import styles from "./ProductCard.module.css";
import formatNumber from "@/components/utils/FormatNumber/formatNumber";

import CountdownTimer from "@/components/utils/timer/CountdownTimer";

const ProductCard = ({ url }) => {
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(fifteenDaysLater.getDate() + 15);
  return (
    <Link href={url}>
      {" "}
      {/* لینک به صفحه مقصد */}
      <div className={styles.card}>
        <div className={styles.circleContainer}>
          <div className={styles.halfCircle}></div>{" "}
          {/* نیم‌دایره داخل کانتینر */}
        </div>
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
            <Barcode
              value="123456789"
              format="CODE128" // فرمت بارکد
              width={1.4}
              height={20}
              displayValue={false} // نمایش مقدار زیر بارکد
              background="transparent" // رنگ پس‌زمینه
              lineColor="#000000" // رنگ خطوط بارکد
            />
          </p>
          <div className={styles.details}>
            <p className={styles.detail}>
              <span className={styles.icon}>💰</span>
              <span className={styles.attr}>قیمت :</span>
              <span className={styles.bold}>{formatNumber(85000)} </span>
              تومان
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>📦</span>
              <span className={styles.attr}>بسته‌بندی :</span>
              اختصاصی ربو
            </p>
            <p className={styles.detail}>
              <span className={styles.icon}>⚖️</span>
              <span className={styles.attr}>وزن :</span>
              <span className={styles.bold}>{formatNumber(800)}</span>
              گرم
            </p>
          </div>
        </div>
        <div className={styles.timer}>ضمانت کیفیت محصول</div>
      </div>
    </Link>
  );
};

export default ProductCard;
