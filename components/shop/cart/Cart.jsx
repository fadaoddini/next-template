import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment-jalaali";
import styles from "./Cart.module.css";
import Timeline from "./Timeline";
import { CartContext } from "./CartContext";
import { AddToCartContext } from "../utils/AddToCartContext";

const Cart = () => {
  const router = useRouter();
  const { orders, updateOrders, allowNextStep } = useContext(CartContext);
  const { orders: addToCartOrders } = useContext(AddToCartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    codeposti: "",
  });

  useEffect(() => {
    if (JSON.stringify(orders) !== JSON.stringify(addToCartOrders)) {
      updateOrders(addToCartOrders);
    }
  }, [addToCartOrders, updateOrders]);

  const [currentStep, setCurrentStep] = useState(1);

  const taxRate = 0.09;
  const commissionRate = 0.05;
  const today = moment().format("jYYYY/jMM/jDD");

  const calculateTotal = (updatedOrders) => {
    return updatedOrders.reduce((acc, { price, discount, count }) => {
      const discountPrice = price - (price * discount) / 100;
      return acc + discountPrice * count;
    }, 0);
  };

  const total = calculateTotal(orders);
  const tax = total * taxRate;
  const commission = total * commissionRate;
  const finalTotal = total + tax + commission;

  const invoiceNumber = 515200

  const handleDelete = (indexToDelete) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToDelete);
    updateOrders(updatedOrders);
  };

  const handleNextStep = () => {
    // if (orders.length === 0) {
    //   alert("سبد خرید شما خالی است!");
    //   return;
    // }
    // if (!customerInfo.name || !customerInfo.address) {
    //   alert("لطفاً اطلاعات مشتری را کامل کنید.");
    //   return;
    // }

    allowNextStep();
    setCurrentStep(currentStep + 1);
    router.push("/shop/address");
  };

  return (
    <div className={styles.cart}>
      <Timeline currentStep={1} />
      <div className={styles.topSection}>
        <img src="/images/logo.png" alt="ربو| بورس خرما" className={styles.logo} />
        <div className={styles.invoiceDetails}>
          <p>
            <strong>تاریخ:</strong> {today}
          </p>
          <p>
            <strong>شماره پیش فاکتور:</strong> {invoiceNumber}
          </p>
        </div>
      </div>
      
      <div className={styles.tableContainer}>
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
              <th>حذف</th>
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
                      src={
                        order.image
                          ? `/images/${order.image}`
                          : "/images/nopic.png"
                      }
                      alt={order.title}
                      className={styles.productImage}
                      width={40}
                      height={40}
                    />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.count}</td>
                  <td>{order.price}</td>
                  <td>{order.discount}%</td>
                  <td>{discountPrice * order.count}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(index)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7">
                <strong>جمع کل:</strong>
              </td>
              <td>{total} ریال</td>
            </tr>
            <tr>
              <td colSpan="7">
                <strong>مالیات (9%):</strong>
              </td>
              <td>{tax} ریال</td>
            </tr>
            
            <tr>
              <td colSpan="7">
                <strong>جمع نهایی:</strong>
              </td>
              <td>{finalTotal} ریال</td>
            </tr>
          </tfoot>
        </table>
        <ul className={styles.under_table}>
          <li>این سند پیش فاکتور می باشد </li>
          <li>
این پیش فاکتور به مدت 24 ساعت معتبر می باشد
          </li>
        </ul>
      </div>
      <div className={styles.actions}>
       
        <button className={styles.continueButton} onClick={handleNextStep}>
          تأیید و ادامه
        </button>
      </div>
    </div>
  );
};

export default Cart;
