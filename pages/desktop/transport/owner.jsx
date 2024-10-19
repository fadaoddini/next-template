import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "config/config";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import CardTransport from "@/components/transport/owner/card/cardTransport";
import TypeTransport from "@/components/transport/owner/type/TypeTransport"; 
import styles from "../../../styles/styleTransportOwner.module.css";
import AnimatedButton from "@/components/utils/Button/AnimatedButton";
import Loading from "@/components/utils/loading/index"; 

const Transport = () => {
  const [types, setTypes] = useState([]); // لیست انواع
  const [selectedType, setSelectedType] = useState(null); // نوع انتخاب‌شده
  const [isTypesLoading, setIsTypesLoading] = useState(true); // وضعیت بارگذاری انواع
  const [typesError, setTypesError] = useState(null); // خطاها در دریافت انواع

  const fetchTypes = async () => {
    setIsTypesLoading(true);
    try {
      const response = await axios.get(
        `${Config.baseUrl}/transport/all_type_transport`,
        { headers: { "Content-Type": "application/json" } }
      );
      setTypes(response.data);
      setTypesError(null);
    } catch (error) {
      setTypesError("Error fetching types.");
    } finally {
      setIsTypesLoading(false);
    }
  };

  // انتخاب نوع
  const handleSelectType = (type) => setSelectedType(type);

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className={styles.container}>
      <DesktopNavBar />
      <div className={styles.layout}>
        
        <div className={styles.main}>
     
            {isTypesLoading ? (
              <Loading />
            ) : typesError ? (
              <p>{typesError}</p>
            ) : (
              <div className="card-body">
                <TypeTransport
                  types={types}
                  selectedType={selectedType}
                  onSelect={handleSelectType}
                />
                <CardTransport selectedType={selectedType} />
              </div>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default Transport;
