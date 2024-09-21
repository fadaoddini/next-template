import MobileNavBar from '../../components/navbar/MobileNavBar';
import styles from '../../styles/styleBazar.module.css'; // وارد کردن استایل


const DesktopHomePage = () => {
  return (
    <div className={styles.container}>
            <MobileNavBar />
      <h1 className={styles.title}>بازار</h1>
    </div>
  );
};

export default DesktopHomePage;
