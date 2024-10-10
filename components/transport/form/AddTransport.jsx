import React, { useState } from "react";
import styles from "./style.module.css"
import CreateTransportModal from "../driver/modal/CreateTransportModal";

const AddTransport = ({types , handleTransportAdded}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  return (
    <div className={styles.main}>
      <button className={styles.buttonPrimary} onClick={openModal}>
        ثبت نام خودروی سنگین
      </button>
      <span className={styles.buttonDescription}>
        بعد از ثبت نام خودروهای خود روی هر کدام کلیک کرده و درخواست بار ثبت کنید
      </span>
      {isModalOpen && (
        <CreateTransportModal
          onClose={closeModal}
          transportTypes={types}
          onTransportAdded={handleTransportAdded}
        />
      )}
    </div>
  );
};

export default AddTransport;
