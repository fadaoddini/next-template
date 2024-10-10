import { useRouter } from "next/router";

import Config from "config/config";

import axios from "axios";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

import DesktopNavBar from "@/components/navbar/DesktopNavBar";

import styles from "../../../../styles/styleChart.module.css";
 // وارد کردن استایل
import DesChartBazar from "@/components/bazar/DesCardBazar/DesChartBazar";

import QueueList from "@/components/bazar/Queue/QueueList";

import MarketChart from "@/components/bazar/ChartCardBazar/MarketChart";


const ChartBazar = ({ color }) => {
  const { authStatus, setAuthStatus } = useAuth();
 // گرفتن وضعیت ورود کاربر
  const router = useRouter();

  const { id } = router.query;
 // دریافت id از URL
  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [itemsSell, setItemsSell] = useState([]);

  const [itemsBuy, setItemsBuy] = useState([]);


  const fetchChart = async () => {
    if (!id) return;

    setLoading(true);

    try {
      const url = Config.getApiUrl("catalogue", `chart/${id}/`);

      const response = await axios.get(url, { withCredentials: true });


      if (response.status === 200) {
        setChartData(response.data);

      } else {
        throw new Error("دریافت اطلاعات نمودار موفقیت‌آمیز نبود");

      }
    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
   
    if (authStatus) {
      fetchChart();

      fetchSellListBids();

      fetchBuyListBids();

    }
  }, [id, authStatus]);


  const fetchSellListBids = async () => {
    if (!id) return;

    setLoading(true);

    setError(null);

    try {
      const response = await axios.get(
        Config.getApiUrl("catalogue", `sell/bid/all/${id}/`)
      );

      if (response.status === 200) {
        
        const newSellItems = response.data.map((bid) => ({
          price: bid.price,
          quantity: bid.weight,
          total: bid.total,
        }));

        setItemsSell(newSellItems);

      } else {
        throw new Error("دریافت بیدهای فروش موفقیت‌آمیز نبود");

      }
    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);

    }
  };


  const fetchBuyListBids = async () => {
    if (!id) return;

    setLoading(true);

    setError(null);

    try {
      const response = await axios.get(
        Config.getApiUrl("catalogue", `buy/bid/all/${id}/`)
      );

      if (response.status === 200) {
        const newItemsBuy = response.data.map((bid) => ({
          price: bid.price,
          quantity: bid.weight,
          total: bid.total,
        }));

        setItemsBuy(newItemsBuy);

      } else {
        throw new Error("دریافت بیدهای خرید موفقیت‌آمیز نبود");

      }
    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);

    }
  };


  const filteredChartData = chartData.map((item) => ({
    date: item.date,
    maxPriceSell: item.maxPriceSell === 0 ? null : item.maxPriceSell,
    minPriceSell: item.minPriceSell === 0 ? null : item.minPriceSell,
    maxPriceBuy: item.maxPriceBuy === 0 ? null : item.maxPriceBuy,
    minPriceBuy: item.minPriceBuy === 0 ? null : item.minPriceBuy,
    volume: item.volume === 0 ? null : item.volume,
  }));


  
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.headerSection}>
            <MarketChart data={filteredChartData} />
          </div>
          <div className={styles.gridContainer}>
            <QueueList items={itemsSell} color="sell" title="صف فروشندگان" />
            <QueueList items={itemsBuy} color="buy" title="صف خریداران" />
          </div>
        </div>
      </div>
    </div>
  );

};


export default ChartBazar;

