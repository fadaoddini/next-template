import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "config/config";
import DesktopNavBar from "../../../components/navbar/DesktopNavBar";
import styles from "../../../styles/styleTransportDriver.module.css";
import CreateTransportModal from "@/components/transport/driver/modal/CreateTransportModal";
import CreateTransportReqModal from "@/components/transport/driver/modal/CreateTransportReqModal"; // Import CreateTransportReqModal
import TransportActive from "@/components/transport/driver/transport/TransportActive";
import TransportNotActive from "@/components/transport/driver/transport/TransportNotActive";
import TransportNotPay from "@/components/transport/driver/transport/TransportNotPay";
import { useAuth } from "@/context/AuthContext";

const Transport = () => {
  const { authStatus } = useAuth();
  const [isTypesLoading, setIsTypesLoading] = useState(true);
  const [isTransportsLoading, setIsTransportsLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [transports, setTransports] = useState([]);
  const [myTransports, setMyTransports] = useState([]);
  const [typesError, setTypesError] = useState(null);
  const [transportsError, setTransportsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transportReqs, setTransportReqs] = useState([]);
  const [transportReqsNotActive, setTransportReqsNotActive] = useState([]);
  const [transportReqsActive, setTransportReqsActive] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null); // State for selected transport
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false); // State for transport request modal

  const fetchTypes = async () => {
    setIsTypesLoading(true);
    if (!authStatus) return;
    try {
      const url = Config.getApiUrl("transport", "all_type_transport");
      const response = await axios.get(url, { withCredentials: true });
      setTypes(response.data);
      setTypesError(null);
    } catch (error) {
      setTypesError(error.message);
    } finally {
      setIsTypesLoading(false);
    }
  };

  const fetchTransports = async () => {
    setIsTransportsLoading(true);
    try {
      const url = Config.getApiUrl("transport", "all_transport");
      const response = await axios.get(url, { withCredentials: true });
      setTransports(response.data);
      setMyTransports(response.data);
      setTransportsError(null);
    } catch (error) {
      setTransportsError("خطایی پیش آمده است.");
    } finally {
      setIsTransportsLoading(false);
    }
  };

  const fetchTransportRequests = async () => {
    try {
      const [notPayResponse, notActiveResponse, activeResponse] =
        await Promise.all([
          axios.post(
            Config.getApiUrl("transport", "not_pay_transport_req_api"),
            {},
            { withCredentials: true }
          ),
          axios.post(
            Config.getApiUrl("transport", "not_active_transport_req_api"),
            {},
            { withCredentials: true }
          ),
          axios.post(
            Config.getApiUrl("transport", "active_transport_req_api"),
            {},
            { withCredentials: true }
          ),
        ]);

      setTransportReqs(notPayResponse.data);
      setTransportReqsNotActive(notActiveResponse.data);
      setTransportReqsActive(activeResponse.data);
    } catch (error) {
      console.error("Error fetching transport requests:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openRequestModal = (transport) => {
    setSelectedTransport(transport);
    setIsRequestModalOpen(true);
  };
  const closeRequestModal = () => {
    setSelectedTransport(null);
    setIsRequestModalOpen(false);
  };
  const handleTransportAdded = async () => {
    await Promise.all([fetchTransports(), fetchTransportRequests()]);
  };

  useEffect(() => {
    fetchTypes();
    fetchTransports();
    fetchTransportRequests();
  }, []);

  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <button onClick={openModal} className={styles.customButton}>
            ثبت نام خودرو
          </button>

          {myTransports.length > 0 ? (
            <ul className={styles.list}>
              {myTransports.map((transport) => {
                const firstTwoDigits = transport.pelak.slice(0, 2);
                const lastThreeDigits = transport.pelak.slice(-3);
                return (
                  <li
                    key={transport.id}
                    className={styles.listItem}
                    onClick={() => openRequestModal(transport)}
                  >
                    <img
                      src={
                        transport.image
                          ? `${Config.baseUrl}${transport.image}`
                          : "path/to/default_image.jpg"
                      }
                      alt={transport.car_name}
                      
                    />
                    <h6>{transport.car_name}</h6>
                    <div className={styles.licensePlate}>
                      <div className={styles.licensePlateTop}>
                        <span className={styles.licensePlateNumber}>
                          {firstTwoDigits} ع {lastThreeDigits}
                        </span>
                        <span className={styles.right_pelak}>
                          <span className={styles.licensePlateIran}>ایران</span>
                          <span className={styles.licensePlateIranBottom}>
                            {transport.iran}
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>هیچ حمل و نقلی ثبت نشده است.</p>
          )}
        </div>

        <div className={styles.main}>
          {isTransportsLoading ? (
            <div>در حال بارگذاری...</div>
          ) : transportsError ? (
            <div>{transportsError}</div>
          ) : (
            <>
              <div className={styles.gridContainer}>
                <TransportNotPay
                  transportReq={transportReqs}
                  handlePaymentClick={(id) => console.log("پرداخت برای:", id)}
                  fetchTransportRequests={fetchTransportRequests}
                />
                <TransportNotActive
                  transportReqsNotActive={transportReqsNotActive}
                />

                <TransportActive
                  transportReqsActive={transportReqsActive}
                  fetchTransportRequests={fetchTransportRequests}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CreateTransportModal
          onClose={closeModal}
          transportTypes={types}
          onTransportAdded={handleTransportAdded}
        />
      )}

      {/* Transport Request Modal */}
      {isRequestModalOpen && (
        <CreateTransportReqModal
          transport={selectedTransport}
          onClose={closeRequestModal}
          onRequestAdded={handleTransportAdded}
        />
      )}
    </div>
  );
};

export default Transport;
