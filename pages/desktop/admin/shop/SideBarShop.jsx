import React from "react";

import styles from "./styles.module.css";
 

const SideBarShop = ({ refreshShop }) => {
  return (
    <div>
      <div className={styles.custom_dir_red}>
        <h3 className={styles.tbazar}>آگهی های پرداخت نشده من</h3>
        ...
      </div>

      <div className={styles.custom_dir_orange}>
        <h3 className={styles.tbazar}>آگهی های در حال بررسی من</h3>
       ...
      </div>

      <div className={styles.custom_dir_green}>
        <h3 className={styles.tbazar}>آگهی های فعال من</h3>
        ...
      </div>
    </div>
  );

};


export default SideBarShop;

