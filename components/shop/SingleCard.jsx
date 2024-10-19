import { useState, useContext } from "react";
import Image from "next/image";
import Barcode from "react-barcode";
import formatNumber from "@/components/utils/FormatNumber/formatNumber";
import styles from "../shop/single/SingleShop.module.css";
import { AddToCartContext } from "./utils/AddToCartContext";
import CountProduct from "./utils/CountProduct";
import { ToastContainer, toast } from "react-toastify";
import Config from "config/config";

const SingleShop = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [count, setCount] = useState(1);
  const { orders, addToCart } = useContext(AddToCartContext);

  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + product.images.length) % product.images.length
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

  // فرمت وزن
  const formattedWeight =
    product.weight < 50
      ? `${formatNumber(product.weight)} کیلوگرم`
      : `${formatNumber(product.weight)} گرم`;

  return (
    <div className={styles.card}>
      <div className={styles.imageSlider}>
        {product.images && product.images.length > 0 ? (
          <img
            src={`${Config.baseUrl}${product.images[currentImageIndex].image}`} // استفاده از base URL
            alt={product.title}
            width={300} // اندازه تصویر
            height={300} // اندازه تصویر
            className={styles.image}
          />
        ) : (
          <Image
            src="/images/no_pic.jpg" // تصویر پیش‌فرض در صورت عدم وجود تصویر
            alt="No image"
            width={300}
            height={300}
            className={styles.image}
          />
        )}
        <button className={styles.prevButton} onClick={goToPreviousImage}>
          &#10094;
        </button>
        <button className={styles.nextButton} onClick={goToNextImage}>
          &#10095;
        </button>
        <div className={styles.dots}>
          {product.images.map((_, index) => (
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

      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>

        <div className={styles.details}>
          <p className={styles.detail}>
            <span className={styles.icon}>💰</span>
            <span className={styles.attr}>قیمت :</span>
            <span className={styles.bold}> {formatNumber(product.price)} </span>
            تومان
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>📂</span>
            <span className={styles.attr}>دسته بندی :</span>
            {product.category.name}
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>📦</span>
            <span className={styles.attr}>بسته‌بندی :</span>
            {product.package.name}
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>⚖️</span>
            <span className={styles.attr}>وزن :</span>
            <span className={styles.bold}>{formattedWeight}</span> {/* استفاده از وزن فرمت شده */}
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>🌟</span>
            <span className={styles.attr}>برند :</span>
            {product.brand}
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>⚠️</span>
            <span className={styles.attr}>محدودیت ارسال :</span>
            {product.number_send} عدد
          </p>
          <p className={styles.under}>{product.description}</p>
          <p className={styles.total_price}>
            {formatNumber(product.price)}
            <span>تومان</span>
          </p>
        </div>
      </div>

      <div className={styles.qrCode}>
        <Barcode
          value={product.barcode || "123456789"}
          format="CODE128"
          width={2}
          height={110}
          displayValue={true}
          background="#ffffff"
          lineColor="#000000"
        />
      </div>

      <div className={styles.counter}>
        <CountProduct
          maxCount={product.number_send}
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

export default SingleShop;
