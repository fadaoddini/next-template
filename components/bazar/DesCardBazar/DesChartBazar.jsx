import React from "react";
import styles from "./DesChart.module.css"; // وارد کردن استایل
import AnimatedSpan from "@/components/utils/Button/AnimatedSpan";

const DesChartBazar = ({ imageSrc, title, description, link }) => {
  return (
    <div className={styles.card}>
      <AnimatedSpan
        title="بهترین پیشنهاد خرید"
        color="green"
        price="120000"
        title2="تومان"
      />
      <AnimatedSpan
        title="بهترین پیشنهاد فروش"
        color="red"
        price="120000"
        title2="تومان"
      />
      <AnimatedSpan
        title="میانگین بازار"
        color="orange"
        price="120000"
        title2="تومان"
      />
      <img src={imageSrc} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description_chart}>{description}</p>
      </div>
    </div>
  );
};

export default DesChartBazar;
