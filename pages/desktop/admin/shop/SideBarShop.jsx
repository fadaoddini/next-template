import React from "react";

import NotPay from "./me/NotPay";

import NotActive from "./me/NotActive";

import YesActive from "./me/YesActive";

import styles from "./styles.module.css";
 

const SideBarShop = ({ refreshShop }) => {
  return (
    <div>
      <div className={styles.custom_dir_red}>
        <h3 className={styles.tbazar}>آگهی های پرداخت نشده من</h3>
        <NotPay refreshProducts={refreshShop} /> {/* ارسال تابع برای بروزرسانی */}
      </div>

      <div className={styles.custom_dir_orange}>
        <h3 className={styles.tbazar}>آگهی های در حال بررسی من</h3>
        <NotActive refreshProducts={refreshShop} />
      </div>

      <div className={styles.custom_dir_green}>
        <h3 className={styles.tbazar}>آگهی های فعال من</h3>
        <YesActive refreshProducts={refreshShop} />
      </div>
    </div>
  );

};


export default SideBarShop;

