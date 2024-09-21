import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import Barcode from "react-barcode";
import Image from "next/image";
import moment from "moment-jalaali";
import styles from "./style_cart.module.css";

const FinalInvoice = () => {
  const { orders, shippingCost, customerInfo, storeInfo, isPaid } =
    useContext(CartContext);

  const taxRate = 0.09;
  const commissionRate = 0.05;

  const calculateTotal = () => {
    const itemsTotal = orders.reduce((sum, item) => {
      const discountPrice = item.price - (item.price * item.discount) / 100;
      return sum + discountPrice * item.count;
    }, 0);

    return itemsTotal + shippingCost;
  };

  const itemsTotal = orders.reduce((sum, item) => {
    const discountPrice = item.price - (item.price * item.discount) / 100;
    return sum + discountPrice * item.count;
  }, 0);

  const total = calculateTotal();
  const tax = total * taxRate;
  const commission = total * commissionRate;
  const finalTotal = total + tax + commission;
  const invoiceNumber = 5464646; // فرض می‌کنیم شماره فاکتور تصادفی است
  const today = new Date().toLocaleDateString("fa-IR"); // تاریخ امروز به فرمت شمسی

  return (
    <div className={styles.finalInvoice}>
      <div className={styles.topSection}>
        <Image
          src="/images/logo.png"
          alt="ربو| بورس خرما"
          width={100}
          height={50}
          className={styles.logo}
        />{" "}
        {/* تغییر به Image */}
        <div className={styles.invoiceDetails}>
        <Barcode
          value="12345672343289"
          format="CODE128" // فرمت بارکد
          width={2}
          height={50}
          displayValue={false} // نمایش مقدار زیر بارکد
          background="#ffffff" // رنگ پس‌زمینه
          lineColor="#000000" // رنگ خطوط بارکد
        />
        </div>
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

      <div className={styles.orderSummary}>
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
              <td>{itemsTotal.toLocaleString()} ریال</td>
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
      </div>
      <div className={styles.actions}>
        <button onClick={() => window.print()} className={styles.pdfButton}>
          چاپ فاکتور (PDF)
        </button>
      </div>
    </div>
  );
};

export default FinalInvoice;
