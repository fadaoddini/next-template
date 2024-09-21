import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleTransportDriver.module.css"; // وارد کردن استایل
import AnimatedButton from "@/components/utils/Button/AnimatedButton";

const Transport = () => {
  
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <AnimatedButton
            title="ثبت نام خودرو"
            href="/learn-more"
            color="green"
          />
          
        </div>
        <div className={styles.main}>
          <div className={styles.gridContainer}>
            main grid driver
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;
