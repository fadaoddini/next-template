import { useState } from "react";
import Image from "next/image";
import Barcode from "react-barcode";
import formatNumber from '@/components/utils/FormatNumber/formatNumber';
import styles from "./SingleCard.module.css";
import CountdownTimer from "@/components/utils/timer/CountdownTimer"; // فرض بر این است که تایمر در مسیر صحیح قرار دارد.

const SingleCard = ({ color, images, description, qrValue }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundColor =
    color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const backgroundColorHover =
    color === "buy" ? "var(--light-green)" : "var(--light-red)";
  const textColor = color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const textColorAttr =
    color === "buy" ? "var(--darked-green)" : "var(--darked-red)";
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(fifteenDaysLater.getDate() + 1);

  // تابع برای تغییر اسلاید
  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  return (
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
      {/* اسلایدر تصاویر */}
      <div className={styles.imageSlider}>
        <Image
          src={images[currentImageIndex]} // تصویر فعلی
          alt="Product Image"
          width={200}
          height={200}
          className={styles.image}
        />
        {/* دکمه‌های جابجایی */}
        <button className={styles.prevButton} onClick={goToPreviousImage}>
          &#10094;
        </button>
        <button className={styles.nextButton} onClick={goToNextImage}>
          &#10095;
        </button>
        {/* نشانگرهای تصویر */}
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                currentImageIndex === index ? styles.active : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* اطلاعات محصول */}
      <div className={styles.info}>
        <h2 className={styles.title}>عنوان محصول</h2>
        <p className={styles.offer}>
          بالاترین پیشنهاد: <span className={styles.green}>{formatNumber(85000)} </span>
          تومان
        </p>
        <div className={styles.details}>
          <p className={styles.detail}>
            <span className={styles.icon}>💰</span>
            <span className={styles.attr}>قیمت :</span>
            <span className={styles.bold}> {formatNumber(85000)} </span>
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
          <p className={styles.under}>{description}</p>
          <p className={styles.total_price}>{formatNumber(255000000)} 
            <span>
            تومان
            </span></p> 
        </div>
      </div>

      {/* تایمر */}
      <div className={styles.timer}>
        <CountdownTimer targetDate={fifteenDaysLater} />
      </div>

      {/* QR Code */}
      <div className={styles.qrCode}>
        <Barcode
          value="123456789"
          format="CODE128" // فرمت بارکد
          width={2}
          height={110}
          displayValue={true} // نمایش مقدار زیر بارکد
          background="#ffffff" // رنگ پس‌زمینه
          lineColor="#000000" // رنگ خطوط بارکد
        />
      </div>
    </div>
  );
};

export default SingleCard;
