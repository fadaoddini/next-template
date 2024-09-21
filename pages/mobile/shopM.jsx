import MobileNavBar from '../../components/navbar/MobileNavBar';

import styles from '../../styles/styleShop.module.css'; // وارد کردن استایل


const MobileHomePage = () => {
  return (
    <div className={styles.container}>
      <MobileNavBar />
      <h1 className={styles.title}>فروشگاه</h1>
    </div>
  );
};

export default MobileHomePage;
