import MobileNavBar from '../../components/navbar/MobileNavBar';

import styles from '../../styles/styleLaw.module.css'; // وارد کردن استایل


const MobileHomePage = () => {
  return (
    <div className={styles.container}>
     <MobileNavBar />
      <h1 className={styles.title}>قوانین</h1>
    </div>
  );
};

export default MobileHomePage;
