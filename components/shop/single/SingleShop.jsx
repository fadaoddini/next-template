import { useState, useContext } from "react";
import Image from "next/image";
import Barcode from "react-barcode";
import formatNumber from "@/components/utils/FormatNumber/formatNumber";
import styles from "./SingleShop.module.css";
import { AddToCartContext } from "../utils/AddToCartContext";
import CountProduct from "../utils/CountProduct";
import { ToastContainer, toast } from 'react-toastify';

const SingleCard = ({ images, description, qrValue }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [count, setCount] = useState(1);
  const { orders, addToCart } = useContext(AddToCartContext);

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

  const handleAddToCart = () => {
    const existingOrder = orders.find((order) => order.id === product.id);
    const totalCount = existingOrder ? existingOrder.count + count : count;

    if (totalCount > product.number_send) {
      toast.error("اضافه کردن بیش از حد مجاز امکان پذیر نمی باشد!");
    } else {
      addToCart(product, count);
      toast.success(`${product.title} به سبد خرید اضافه شد!`);
     
    }
  };

  return (
    <div className={styles.card}>
      {/* اسلایدر تصاویر */}
      <div className={styles.imageSlider}>
        <Image
          src={images[currentImageIndex]} // تصویر فعلی
          alt="Product Image"
          width={300}
          height={300}
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

        <div className={styles.details}>
          <p className={styles.detail}>
            <span className={styles.icon}>💰</span>
            <span className={styles.attr}>قیمت :</span>
            <span className={styles.bold}> {formatNumber(85000)} </span>
            تومان
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>📂</span>
            <span className={styles.attr}>دسته بندی :</span>
            خرما - مضافتی
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

          <p className={styles.detail}>
            <span className={styles.icon}>🌟</span>
            <span className={styles.attr}>برند :</span>
            ربو
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>⚠️</span>
            <span className={styles.attr}>محدودیت ارسال :</span>3 عدد
          </p>

          <p className={styles.under}>{description}</p>
          <p className={styles.total_price}>
            {formatNumber(85000)}
            <span>تومان</span>
          </p>
        </div>
      </div>

      {/* تایمر */}
      <div className={styles.timer}>دارای ضمانت کیفیت محصولات ربو</div>

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
      <div className={styles.counter}>
        <CountProduct
          maxCount={3}
          count={count}
          setCount={setCount}
        />
      </div>
      <div className={styles.fillBtnOrange} onClick={handleAddToCart}>
            افزودن به سبد خرید
          </div>
    </div>
  );
};

export default SingleCard;
