import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"; // تغییر از useNavigate به useRouter
import moment from "moment-jalaali";
import styles from "./style_cart.module.css";
import Timeline from "./Timeline";
import Image from "next/image"; // استفاده از Image به جای img
import { CartContext } from "./CartContext";

const Review = () => {
  const {
    isAllowed,
    restrictAccess,
    orders,
    shippingCost,
    customerInfo,
    storeInfo,
  } = useContext(CartContext);

  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [commission, setCommission] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [invoiceNumber] = useState(123456789);
  const router = useRouter(); // استفاده از useRouter

  const taxRate = 0.09;
  const commissionRate = 0.05;

  useEffect(() => {
    if (!isAllowed) {
      router.push("/"); // تغییر به router.push
    } else {
      calculateTotals();
    }

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isAllowed, orders, shippingCost, router]);

  const calculateTotals = () => {
    const itemsTotal = orders.reduce((sum, item) => {
      const discountPrice = item.price - (item.price * item.discount) / 100;
      return sum + discountPrice * item.count;
    }, 0);

    const totalWithShipping = itemsTotal + shippingCost;
    const calculatedTax = totalWithShipping * taxRate;
    const calculatedCommission = totalWithShipping * commissionRate;
    const calculatedFinalTotal =
      totalWithShipping + calculatedTax + calculatedCommission;

    setTotal(itemsTotal);
    setTax(calculatedTax);
    setCommission(calculatedCommission);
    setFinalTotal(calculatedFinalTotal);
  };

  const handleBackButton = () => {
    window.history.pushState(null, document.title, window.location.href);
  };

  const handlePayment = () => {
    router.push("/shop/finalInvoice"); // تغییر به router.push
  };

  return (
    <div className={styles.review}>
      <Timeline currentStep={3} />
      <div className={styles.topSection}>
        <Image
          src="/images/logo.png"
          alt="ربو| بورس خرما"
          width={100}
          height={50}
          className={styles.logo}
        />{" "}
        {/* تغییر به Image */}
        
        <div className={styles.qrcode}>
        <p>
            <strong>تاریخ:</strong> {moment().format("jYYYY/jMM/jDD")}
          </p>
          <p>
            <strong>شماره پیش فاکتور:</strong> {invoiceNumber}
          </p>
        </div>
      </div>
      <div className={styles.infoContainer}>
        {customerInfo && (
          <div className={styles.customerInfo}>
            <p>
              <strong>نام مشتری:</strong> {customerInfo.name} |{" "}
              <strong>تلفن:</strong> {customerInfo.phone} |{" "}
              <strong>کدپستی:</strong> {customerInfo.postalCode} 
            
            </p>

            <p>
            <strong>شهر:</strong> {customerInfo.city} |{" "}
            <strong>شهرستان:</strong> {customerInfo.subCity}|{" "}
            <strong>آدرس:</strong> {customerInfo.address}
            </p>
          </div>
        )}
       
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>تصویر</th>
            <th>عنوان</th>
            <th>تعداد</th>
            <th>قیمت کالا (ریال)</th>
            <th>درصد تخفیف</th>
            <th>قیمت بعد از تخفیف (ریال)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const discountPrice =
              order.price - (order.price * order.discount) / 100;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={order.image || noPic}
                    alt={order.title}
                    width={50}
                    height={50}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.src = noPic;
                    }}
                  />
                </td>
                <td>{order.title}</td>
                <td>{order.count}</td>
                <td>{order.price.toLocaleString()}</td>
                <td>{order.discount}%</td>
                <td>{(discountPrice * order.count).toLocaleString()}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="6">هزینه ارسال</td>
            <td>{shippingCost.toLocaleString()} ریال</td>
          </tr>
          <tr>
            <td colSpan="6">جمع کل</td>
            <td>{total.toLocaleString()} ریال</td>
          </tr>
          <tr>
            <td colSpan="6">مالیات (9%)</td>
            <td>{tax.toLocaleString()} ریال</td>
          </tr>
         
          <tr>
            <td colSpan="6">جمع نهایی</td>
            <td>
              <strong>{finalTotal.toLocaleString()} ریال</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <ul className={styles.under_table}>
          <li>این سند پیش فاکتور می باشد </li>
          <li>
این پیش فاکتور به مدت 24 ساعت معتبر می باشد
          </li>
        </ul>
      <div className={styles.actions}>
        
        <button
          type="button"
          onClick={handlePayment}
          className={styles.continueButton}
        >
          پرداخت
        </button>
      </div>
    </div>
  );
};

export default Review;
