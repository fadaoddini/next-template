import MobileNavBar from '../../components/navbar/MobileNavBar';

import styles from '../../styles/styleTransport.module.css'; // وارد کردن استایل


const MobileHomePage = () => {
  return (
    <div className={styles.container}>
      <MobileNavBar />
      <h1 className={styles.title}>حمل و نقل</h1>
    </div>
  );
};

export default MobileHomePage;
