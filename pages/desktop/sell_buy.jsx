import { useRouter } from "next/router";
import DesktopNavBar from "../../components/navbar/DesktopNavBar";
import CategoryTypeBazar from "../../components/CategoryTypeBazar/CategoryTypeBazar"; // وارد کردن کامپوننت جدید
import styles from "../../styles/styleSeller.module.css";

const DesktopHomePage = () => {
  const router = useRouter();
  const { color } = router.query; // دریافت پارامتر color از URL

  const backgroundColor =
    color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const backgroundColorHover =
    color === "buy" ? "var(--light-green)" : "var(--light-red)";
  const textColor = color === "buy" ? "var(--dark-green)" : "var(--dark-red)";
  const textColorAttr =
    color === "buy" ? "var(--darked-green)" : "var(--darked-red)";

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
      <div className={styles.section_type}>
        <h1 className={styles.title}>انواع خرمای مضافتی درجه یک</h1>

        {/* صفحه اصلی با کارت‌ها */}
        <div className={styles.pageContent}>
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی"
            description="زیر 6 کیلوگرم"
            imageSrc="/images/mazafati.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی "
            description="6 تا 7 کیلوگرم"
            imageSrc="/images/mazafati.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی"
            description="7 تا 8 کیلوگرم"
            imageSrc="/images/mazafati.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی"
            description="بالای 8 کیلوگرم"
            imageSrc="/images/mazafati.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
        </div>
      </div>
      <div className={styles.section_type}>
        <h1 className={styles.title}>انواع خرمای مضافتی درجه دو</h1>

        {/* صفحه اصلی با کارت‌ها */}
        <div className={styles.pageContent}>
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی درجه دو"
            description="زیر 50 درصد"
            imageSrc="/images/darage2.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی درجه دو"
            description="بین 50 تا 70 درصد"
            imageSrc="/images/darage2.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای مضافتی درجه دو"
            description="بالاتر از 70 درصد"
            imageSrc="/images/darage2.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
        </div>
      </div>
      <div className={styles.section_type}>
        <h1 className={styles.title}>سایر انواع خرما </h1>

        {/* صفحه اصلی با کارت‌ها */}
        <div className={styles.pageContent}>
          <CategoryTypeBazar
            color={color}
            title="خرمای پیارم"
            description="درجه یک"
            imageSrc="/images/piarom1.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای ربی"
            description="درجه یک"
            imageSrc="/images/rabbi.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
          <CategoryTypeBazar
            color={color}
            title="خرمای هلیله ای"
            description="درجه یک"
            imageSrc="/images/halil.jpg"
            buttonText="انتخاب"
            linkUrl="/bazar/details" // لینک صفحه فروشنده
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
