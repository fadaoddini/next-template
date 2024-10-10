import styles from "./VerifyZarinPal.module.css";

import axios from "axios";

import Config from "config/config";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


const VerifyZarinPal = () => {
  const router = useRouter();

  const { Authority, Status } = router.query;


  const [paymentStatus, setPaymentStatus] = useState(null);

  const [countdown, setCountdown] = useState(3);
 // شروع تایمر از ۳

  useEffect(() => {
    if (Status) {
      if (Status === "OK" && Authority) {
        const url = Config.getApiUrl("transport", "payment/verify/");

        axios.get(url, {
          params: {
            authority: Authority, // تغییر به حروف کوچک
            status: Status, // تغییر به حروف کوچک
          },
          withCredentials: true,
        });

        setPaymentStatus("success");

      } else {
        setPaymentStatus("failed");

      }
    }
  }, [Status]);


  useEffect(() => {
    if (paymentStatus) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            router.push("/driver");

            clearInterval(timer);

          }
          return prevCountdown - 1;

        });

      }, 1000);


      return () => clearInterval(timer);
 // پاک‌سازی تایمر
    }
  }, [paymentStatus, router]);


  const handleGoBack = () => {
    router.push("/");

  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {paymentStatus === "success" ? (
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.iconSuccess} />
            <h2 className={styles.title}>پرداخت موفقیت‌آمیز بود!</h2>
            <p className={styles.trackingCode}>کد پیگیری: {Authority}</p>
          </div>
        ) : paymentStatus === "failed" ? (
          <div className={styles.failedMessage}>
            <FaTimesCircle className={styles.iconFailed} />
            <h2 className={styles.title}>پرداخت ناموفق بود!</h2>
            <p className={styles.errorMessage}>لطفاً دوباره تلاش کنید.</p>
          </div>
        ) : (
          <p className={styles.loadingMessage}>در حال بررسی وضعیت پرداخت...</p>
        )}
        {paymentStatus && countdown > 0 && (
          <p className={styles.countdown}>
            هدایت به صفحه بعدی در {countdown} ثانیه...
          </p>
        )}
        <button className={styles.goBackButton} onClick={handleGoBack}>
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );

};


export default VerifyZarinPal;

