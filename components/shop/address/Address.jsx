import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { CartContext } from "../cart/CartContext";
import { useRouter } from "next/router"; // تغییر به useRouter به جای useNavigate
import styles from "./Address.module.css";
import Image from "next/image"; // برای استفاده از تصویر بهینه شده در Next.js

const Address = () => {
  const {
    customerInfo,
    updateCustomerInfo,
    addShippingCost,
    isAllowed,
    restrictAccess,
  } = useContext(CartContext);
  
  const [cities, setCities] = useState([]);
  const [subCities, setSubCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [shippingCost, setLocalShippingCost] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    name: "",
    address: "",
    phone: "",
    postalCode: "",
    city: "",
    subCity: "",
    receiverName: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const router = useRouter(); // استفاده از useRouter برای روتینگ در Next.js

  useEffect(() => {
    const cityOptions = [
      { value: "tehran", label: "تهران" },
      { value: "isfahan", label: "اصفهان" },
      { value: "shiraz", label: "شیراز" },
    ];
    setCities(cityOptions);

    setSubCities({
      tehran: [
        { value: "north", label: "شمال تهران" },
        { value: "south", label: "جنوب تهران" },
      ],
      isfahan: [
        { value: "center", label: "مرکز اصفهان" },
        { value: "suburbs", label: "حومه اصفهان" },
      ],
      shiraz: [
        { value: "downtown", label: "مرکز شیراز" },
        { value: "outskirts", label: "حومه شیراز" },
      ],
    });

    if (!isAllowed) {
      router.push("/"); // هدایت به صفحه اصلی در صورت عدم اجازه دسترسی
    }
  }, [isAllowed, router]);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      city: selectedOption.label, 
    }));
    const cost =
      selectedOption.value === "tehran"
        ? 10000
        : selectedOption.value === "isfahan"
        ? 8000
        : 6000;
    setLocalShippingCost(cost);
  };

  const handleSubCityChange = (selectedOption) => {
    setCurrentAddress((prevAddress) => ({
      ...prevAddress,
      subCity: selectedOption.label, 
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedAddresses = addresses.map((address, index) =>
        index === editIndex ? currentAddress : address
      );
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, currentAddress]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setCurrentAddress(addresses[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSelectAddress = (index) => {
    updateCustomerInfo(addresses[index]);
    addShippingCost(shippingCost);
    router.push("/shop/review"); // هدایت به صفحه مرور
  };

  const resetForm = () => {
    setCurrentAddress({
      name: "",
      address: "",
      phone: "",
      postalCode: "",
      city: "",
      subCity: "",
      receiverName: "",
    });
    setSelectedCity(null);
    setEditIndex(null);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="city">شهر</label>
                <Select
                  options={cities}
                  onChange={handleCityChange}
                  value={cities.find((c) => c.value === selectedCity?.value)}
                  placeholder="انتخاب شهر"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="subCity">محله</label>
                <Select
                  options={subCities[selectedCity?.value] || []}
                  onChange={handleSubCityChange}
                  value={subCities[selectedCity?.value]?.find(
                    (s) => s.value === currentAddress.subCity
                  )}
                  placeholder="انتخاب محله"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="address">آدرس</label>
                <textarea
                  className={styles.custom_input}
                  id="address"
                  name="address"
                  value={currentAddress.address}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="postalCode">کد پستی</label>
                <input className={styles.input_form}
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={currentAddress.postalCode}
                  onChange={handleFormChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">شماره تماس</label>
                <input className={styles.input_form}
                  type="text"
                  id="phone"
                  name="phone"
                  value={currentAddress.phone}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              {editIndex !== null ? "ویرایش آدرس" : "ثبت آدرس"}
            </button>
          </form>
        </div>

        <div className={styles.rightPanel}>
          
          {addresses.length === 0 ? (
            <p>هیچ آدرسی ثبت نشده است.</p>
          ) : (
            addresses.map((address, index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardContent}>
                  <div className={styles.row}>
                    <p>
                      <strong>نام گیرنده:</strong> {address.receiverName}
                    </p>
                    <p>
                      <strong>شماره تماس:</strong> {address.phone}
                    </p>
                  </div>
                  <div className={styles.row}>
                    <p>
                      <strong>کد پستی:</strong> {address.postalCode}
                    </p>
                    <p>
                      <strong>شهر:</strong> {address.city}
                    </p>
                    <p>
                      <strong>محله:</strong> {address.subCity}
                    </p>
                  </div>
                  <div className={styles.row}>
                    <p>
                      <strong>آدرس:</strong> {address.address}
                    </p>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(index)}
                  >
                    ویرایش
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(index)}
                  >
                    حذف
                  </button>
                  <button
                    className={styles.selectButton}
                    onClick={() => handleSelectAddress(index)}
                  >
                    انتخاب به عنوان آدرس پیش‌فرض
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
