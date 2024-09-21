import DesktopNavBar from "../../components/navbar/DesktopNavBar";
import CardBgImageByButton from "../../components/CardBgImageByButton/CardBgImageByButton"; // وارد کردن کامپوننت جدید
import styles from "../../styles/styleBazar.module.css";
import DesCardBazar2 from "@/components/bazar/DesCardBazar/DesCardBazar2";
import DesCardBazar3 from "@/components/bazar/DesCardBazar/DesCardBazar3";

const DesktopHomePage = () => {
  return (
    <div className={styles.container}>
      <DesktopNavBar />
      <h1 className={styles.title}>لطفا بازار مورد نظر را انتخاب کنید</h1>

      {/* صفحه اصلی با کارت‌ها */}
      <div className={styles.pageContent}>
        <DesCardBazar2
          href="/sell_buy"
          color="sell"
          coverImage="/images/frosh1.jpg"
          characterImage="/images/frosh1.png"
        />

        <DesCardBazar3
          href="/sell_buy"
          color="buy"
          coverImage="/images/kharid.jpg"
          characterImage="/images/kharid.png"
        />
      </div>
      <p className={styles.footer_title}>
        با انتخاب بازار مناسب راحت تر به هدفت دست پیداکن
      </p>
    </div>
  );
};

export default DesktopHomePage;
