import React, { useState } from 'react';
import axios from 'axios';
import Config from 'config/config';
import style from './TransportList.module.css';
import ConfirmDialog from "@/components/utils/ConfirmDialog/ConfirmDialog";

const TransportNotPay = ({ transportReq, handlePaymentClick, fetchTransportRequests }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // وضعیت باز یا بسته بودن دیالوگ
  const [selectedTransportId, setSelectedTransportId] = useState(null); // حمل و نقل انتخاب‌شده برای حذف

  const handleDeleteClick = (transportId) => {
    setSelectedTransportId(transportId); // تنظیم حمل و نقل انتخاب‌شده
    setIsDialogOpen(true); // باز کردن دیالوگ تأیید
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(Config.getApiUrl('transport', 'delete_transport_req_api/'), {
        data: { transport_req_id: selectedTransportId },
        withCredentials: true,
      });

      fetchTransportRequests();
    } catch (error) {
      console.error('Error deleting transport:', error);
    } finally {
      setIsDialogOpen(false); // بستن دیالوگ پس از تأیید
      setSelectedTransportId(null); // بازنشانی شناسه حمل و نقل انتخاب‌شده
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false); // بستن دیالوگ در صورت لغو
    setSelectedTransportId(null); // بازنشانی شناسه حمل و نقل انتخاب‌شده
  };

  return (
    <div className={style.custom_dir}>
      <h6 className={style.tbazar}>آگهی های پرداخت نشده من</h6>
      <div>
        {transportReq.length > 0 ? (
          transportReq.map((transport) => (
            <div key={transport.id} className={style.boxCardSingle}>
              <div className={style.boxCardInner}>
                <img
                  src={transport.image ? `${Config.baseUrl}${transport.image}` : nopic}
                  alt="Transport"
                  className={style.productImage}
                />
                <div className={style.productDetails}>
                  <div className={style.title2}>
                    {transport.my_transport.car_name} .(
                    ظرفیت :
                    <span className={style.productPrice}>
                      {transport.my_transport.capacity}
                    </span>
                    تن)
                  </div>
                  <div className={style.title2}>
                    قیمت :
                    <span className={style.productPrice}>{transport.price}</span> ریال
                  </div>
                  <div className={style.title2}>
                    مبدا :
                    <span className={style.productPrice}>{transport.origin}</span> -
                    مقصد :
                    <span className={style.productPrice}>{transport.destination}</span>
                  </div>

                  <div
                    className={`${style.productBadge} ${
                      transport.status ? style.active : style.inactive
                    }`}
                  >
                    {transport.status ? 'فعال' : 'غیرفعال'}
                  </div>
                </div>
              </div>
              <div className={style.buttonContainer}>
                <button
                  className={style.payButton}
                  onClick={() => handlePaymentClick(transport.id)}
                >
                  پرداخت
                </button>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDeleteClick(transport.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={style.pp}>حمل و نقلی پیدا نشد</div>
        )}
      </div>

      {/* نمایش دیالوگ تأیید در صورت باز بودن */}
      <ConfirmDialog
        message="آیا مطمئن هستید که می‌خواهید این حمل و نقل را حذف کنید؟"
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="بله، حذف کن"
        cancelText="لغو"
      />
    </div>
  );
};

export default TransportNotPay;
