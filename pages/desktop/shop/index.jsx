import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "config/config";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleShop.module.css"; // وارد کردن استایل
import ProductCard from "@/components/shop/ProductCard";
import AnimatedButton from "@/components/utils/Button/AnimatedButton";

const Shop = () => {
  const [productsActive, setProductsActive] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // گرفتن اطلاعات محصولات از API
  useEffect(() => {
    const handleMyTransport = async () => {
      try {
        const url = Config.getApiUrl("shop", "all_products_in_all_shops");
        const response = await axios.get(url, { withCredentials: true });

        setProductsActive(response.data);
       
      } catch (error) {
        console.error("An error occurred:", error);
        setError("خطا در دریافت اطلاعات.");
      } finally {
        setLoading(false);
      }
    };

    handleMyTransport(); // فراخوانی تابع در اولین بارگذاری
  }, []);

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
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.gridContainer}>
              {productsActive.length > 0 ? (
                productsActive.map((product) => {
                  const imageUrl = product.images && product.images.length > 0
                    ? `${Config.baseUrl}${product.images[0].image}`
                    : "/images/nopic.jpg";
                  
                  const productPrice = product.price
                    ? parseInt(product.price, 10)
                    : 0;
                  const productWeight = product.weight
                    ? parseInt(product.weight, 10)
                    : 0;

                  return (
                    <ProductCard
                      key={product.id}
                      upc={product.id}
                      url={`/shop/single/${product.id}`} // آدرس صفحه هر محصول
                      id={product.id}
                      weight={productWeight}
                      title={product.title} // ارسال اطلاعات به ProductCard
                      price={productPrice} // ارسال قیمت به صورت int
                      image={imageUrl} // ارسال تصویر کامل شده
                    />
                  );
                })
              ) : (
                <p>هیچ محصولی موجود نیست.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
