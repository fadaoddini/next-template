import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios"; // برای ارسال درخواست به API
import DesktopNavBar from "../../components/navbar/DesktopNavBar";
import CategoryTypeBazar from "../../components/CategoryTypeBazar/CategoryTypeBazar";
import styles from "../../styles/styleSeller.module.css";
import Config from "config/config";

const DesktopHomePage = () => {
  const router = useRouter();
  const { color } = router.query; // دریافت پارامتر color از URL

  const [data, setData] = useState([]); // ذخیره داده‌های دریافت شده
  const [loading, setLoading] = useState(true); // حالت بارگذاری

  // تابع برای دریافت داده‌ها از API
  const fetchData = async () => {
    try {
      const response = await axios.get(Config.getApiUrl("catalogue", "all_types"));
      setData(response.data);
      setLoading(false); // پایان بارگذاری
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // دریافت داده‌ها هنگام بارگذاری صفحه
  }, []);

  // فیلتر کردن داده‌ها بر اساس cat_id
  const getCategoryData = (catId) => {
    return data.filter((item) => item.cat_id === catId);
  };

  const backgroundColor =
    color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const backgroundColorHover =
    color === "buy" ? "var(--light-green)" : "var(--light-red)";
  const textColor = color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const textColorAttr =
    color === "buy" ? "var(--darked-green)" : "var(--darked-red)";

  if (loading) {
    return <div>در حال بارگذاری...</div>; // نمایش حالت بارگذاری
  }

  return (
    <div
      className={styles.container}
      style={{
        "--bg": backgroundColor,
        "--text": textColor,
        "--bg-hover": backgroundColorHover,
        "--text-dark": textColorAttr,
      }}
    >
      <DesktopNavBar />
      
      {/* بخش انواع خرمای مضافتی درجه یک */}
      <div className={styles.section_type}>
        <h1 className={styles.title}>انواع خرمای مضافتی درجه یک</h1>
        <div className={styles.pageContent}>
          {getCategoryData(1).map((item) => (
            <CategoryTypeBazar
              key={item.id}
              id={item.id}  // id برای URL
              color={color}
              title={item.name}
              description={item.title}
              imageSrc={`${Config.baseUrl}${item.image}`} // ترکیب baseUrl با image
              buttonText="انتخاب"
              linkUrl="/bazar/details"
            />
          ))}
        </div>
      </div>

      {/* بخش انواع خرمای مضافتی درجه دو */}
      <div className={styles.section_type}>
        <h1 className={styles.title}>انواع خرمای مضافتی درجه دو</h1>
        <div className={styles.pageContent}>
          {getCategoryData(6).map((item) => (
            <CategoryTypeBazar
              key={item.id}
              id={item.id}  // id برای URL
              color={color}
              title={item.name}
              description={item.title}
              imageSrc={`${Config.baseUrl}${item.image}`} // ترکیب baseUrl با image
              buttonText="انتخاب"
            />
          ))}
        </div>
      </div>

      {/* بخش سایر انواع خرما */}
      <div className={styles.section_type}>
        <h1 className={styles.title}>سایر انواع خرما</h1>
        <div className={styles.pageContent}>
          {getCategoryData(10).map((item) => (
            <CategoryTypeBazar
              key={item.id}
              id={item.id}  // id برای URL
              color={color}
              title={item.name}
              description={item.title}
              imageSrc={`${Config.baseUrl}${item.image}`} // ترکیب baseUrl با image
              buttonText="انتخاب"
              linkUrl="/bazar/details"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
