import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleTransport.module.css"; // وارد کردن استایل
import AnimatedButton from "@/components/utils/Button/AnimatedButton";

const Transport = () => {
  
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
          <div className={styles.gridContainer}>
            main grid
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;
