import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleCard from "@/components/shop/SingleCard"; 
import axios from "axios";  // اطمینان از ایمپورت axios
import Config from "config/config"; 
import formatNumber from "@/components/utils/FormatNumber/formatNumber"; // اطمینان از ایمپورت توابع فرمت

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query; // گرفتن id از URL

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // فراخوانی API برای گرفتن اطلاعات محصول بر اساس id
      const fetchProduct = async () => {
        try {
          const url = Config.getApiUrl("shop", `product_by_id/${id}/`);  // اضافه کردن id به URL
          const response = await axios.get(url, { withCredentials: true });

          const fetchedProduct = response.data;

          // فرمت وزن محصول
          const formattedWeight = fetchedProduct.weight < 50 
            ? `${formatNumber(fetchedProduct.weight)} کیلوگرم`
            : `${formatNumber(fetchedProduct.weight)} گرم`;

          // اضافه کردن وزن فرمت شده به شیء محصول
          const updatedProduct = {
            ...fetchedProduct,
            formattedWeight, // افزودن وزن فرمت شده
          };

          setProduct(updatedProduct); // ذخیره اطلاعات محصول در state
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  return (
    <div>
      {product ? (
        <SingleCard product={product} />
      ) : (
        <p>در حال بارگذاری...</p> 
      )}
    </div>
  );
};

export default ProductPage;
