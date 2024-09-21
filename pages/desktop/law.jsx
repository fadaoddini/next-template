import DesktopNavBar from '../../components/navbar/DesktopNavBar';
import styles from '../../styles/styleLaw.module.css'; // وارد کردن استایل


const DesktopHomePage = () => {
  return (
    <div className={styles.container}>
      <DesktopNavBar />
      <h1 className={styles.title}>قوانین</h1>
    </div>
  );
};

export default DesktopHomePage;
