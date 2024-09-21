import DesktopNavBar from "@/components/navbar/DesktopNavBar";
import styles from "../../../styles/styleChooseTransport.module.css";
import DesCardTransport2 from "@/components/transport/choose/DesCardTransport2";
import DesCardTransport3 from "@/components/transport/choose/DesCardTransport3";

const ChooseTransport = () => {
  return (
    <div className={styles.container}>
      <DesktopNavBar />
      <h1 className={styles.title}>لطفا انتخاب کنید</h1>

      {/* صفحه اصلی با کارت‌ها */}
      <div className={styles.pageContent}>
        <DesCardTransport2
          href="/driver"
          color="sell"
          coverImage="/images/driver_man.jpg"
          characterImage="/images/driver_man.png"
        />

        <DesCardTransport3
          href="/owner"
          color="buy"
          coverImage="/images/owner.jpg"
          characterImage="/images/owner.png"
        />
      </div>
      <p className={styles.footer_title}>
        با انتخاب گزینه مناسب راحت تر به هدفت دست پیداکن
      </p>
    </div>
  );
};

export default ChooseTransport;
