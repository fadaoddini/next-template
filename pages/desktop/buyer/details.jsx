import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Config from "config/config";
import axios from "axios";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleBuyDetails.module.css";
import AddProduct from "@/components/bazar/Form/AddProduct";
import DesCardBazar from "@/components/bazar/DesCardBazar/DesCardBazar";
import CardBgImageByButton from "@/components/CardBgImageByButton/CardBgImageByButton";
import ProductCard from "@/components/bazar/ItemCardBazar/vertical/ProductCard";
import AnimatedButton from "@/components/utils/Button/AnimatedButton";

const DesktopHomePage = () => {
  const router = useRouter();
  const { color } = router.query;
  const { id } = router.query;
  const [catName, setCatName] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    if (!id || !color) return;
    setLoading(true);
    try {
      const response = await axios.get(
        Config.getApiUrl("catalogue", `bazar/api/${id}/`)
      );
      if (color === "sell") {
        setProducts(response.data.sellers);
        console.log(response.data.sellers);
        console.log("response.data.sellers");
      } else if (color === "buy") {
        setProducts(response.data.buyers);
        console.log(response.data.buyers);
        console.log("response.data.buyers");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchName = async () => {
    if (!id) return;
    try {
      // درخواست برای دریافت صف فروش
      const response = await axios.get(
        Config.getApiUrl("catalogue", `category/name/${id}/`)
      );
      if (response.status === 200) {
        setCatName(response.data);
      }
    } catch (error) {
      console.error("خطا در دریافت صف‌ها:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchName();
  }, [id, color]);

  if (loading) {
    if (!id || !color) return <p>در حال بارگذاری...</p>;
  }

  if (error) {
    return <p>خطا: {error.message}</p>;
  }

  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <AddProduct sellBuyType={color} fetchProducts={fetchProducts} />

          <DesCardBazar
            color={color}
            imageSrc={`${Config.baseUrl}${catName.image}`}
            title={`${catName.name} ${catName.title}`}
            link={`/desktop/buyer/chart/${id}`} // مسیر جدید به جای مسیر قدیمی
            description={catName.description}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.gridContainer}>
            {Array.isArray(products) &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  color={color}
                  title={product.name_type}
                  description={product.description || ""}
                  price={product.price || 0}
                  top_price_bid={product.top_price_bid || 0}
                  upc={product.upc || ""}
                  weight={product.weight || 0}
                  packaging={product.attr_value[0]?.value || "نامشخص"} // بررسی بسته‌بندی
                  finished_time={product.finished_time}
                  imageSrc={
                    product.images && product.images.length > 0
                      ? `${Config.baseUrl}${product.images[0].image}`
                      : "/images/no_pic.jpg" // تصویر پیش‌فرض
                  }
                  url={`/bazar/single/${product.id}?color=${color}`} // استفاده از پارامتر داینامیک در URL
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
