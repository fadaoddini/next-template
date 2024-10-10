import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import axios from "axios";

import Config from "config/config";

import SingleShop from "@/components/shop/single/SingleShop";

import styles from "@/styles/styleShop.module.css";
 // وارد کردن استایل
import DesktopNavBar from "@/components/navbar/DesktopNavBar";

import AnimatedButton from "@/components/utils/Button/AnimatedButton";


const ProductPage = () => {
  const router = useRouter();

  const { id } = router.query;
 // گرفتن id از URL

  const [product, setProduct] = useState(null);


  useEffect(() => {
    if (id) {
      // فراخوانی API برای گرفتن اطلاعات محصول بر اساس id
      const fetchProduct = async () => {
        try {
          const url = Config.getApiUrl("shop", `product_by_id/${id}/`);
 // اضافه کردن id به URL
          const response = await axios.get(url, { withCredentials: true });


          setProduct(response.data);
 // ذخیره اطلاعات محصول در state
        } catch (error) {
          console.error("Error fetching product:", error);

        }
      };


      fetchProduct();

    }
  }, [id]);


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
          {product ? (
            <SingleShop product={product} />
          ) : (
            <p>در حال بارگذاری...</p>
          )}
        </div>
      </div>
    </div>
  );

};


export default ProductPage;

