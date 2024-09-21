import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment-jalaali";
import styles from "./MarketChart.module.css";

// Registering required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MarketChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState("7"); // Default to 7 days

  // Filter data based on time range
  const getFilteredData = (range) => {
    const now = moment();
    return data.filter((item) => {
      const date = moment(item.date, "YYYY-MM-DD"); // Assuming dates are in ISO format
      return now.diff(date, "days") <= range;
    });
  };

  const filteredData = useMemo(
    () => getFilteredData(timeRange === "7" ? 7 : 30),
    [timeRange, data]
  );

  // Transforming data into Chart.js format
  const dates = filteredData.map((item) =>
    moment(item.date).format("jYYYY/jMM/jDD")
  );
  const maxPrices = filteredData.map((item) => item.maxPrice);
  const minPrices = filteredData.map((item) => item.minPrice);
  const volumes = filteredData.map((item) => item.volume);
  const averagePrices = filteredData.map(
    (item) => (item.maxPrice + item.minPrice) / 2
  );
  // دسترسی به متغیرهای CSS
  const rootStyles = getComputedStyle(document.documentElement);

  const redColor = rootStyles.getPropertyValue("--chart-red");
  const redColorDark = rootStyles.getPropertyValue("--chart-red-dark");
  const greenColor = rootStyles.getPropertyValue("--chart-green");
  const greenColorDark = rootStyles.getPropertyValue("--chart-green-dark");
  const blueColor = rootStyles.getPropertyValue("--chart-blue");
  const blackColor = rootStyles.getPropertyValue("--chart-black");

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "بالاترین قیمت",
        data: maxPrices.map((price, index) => ({ x: dates[index], y: price })),
        backgroundColor: greenColor.trim(),
        borderColor: greenColorDark.trim(),
        borderWidth: 2,
        pointRadius: 4,
        showLine: false,
        type: "scatter",
      },
      {
        label: "پایین‌ترین قیمت",
        data: minPrices.map((price, index) => ({ x: dates[index], y: price })),
        backgroundColor: redColor.trim(),
        borderColor: redColorDark.trim(),
        borderWidth: 2,
        pointRadius: 4,
        showLine: false,
        type: "scatter",
      },
      {
        label: "میانگین قیمت",
        data: averagePrices.map((price, index) => ({
          x: dates[index],
          y: price,
        })),
        backgroundColor: blackColor.trim(),
        borderColor: blackColor.trim(),
        borderWidth: 1,
        pointRadius: 4,
        showLine: false,
        type: "scatter",
      },
      {
        label: "میانگین قیمت (خط شیشه‌ای)",
        data: averagePrices.map((price, index) => ({
          x: dates[index],
          y: price,
        })),
        borderColor: "rgba(0, 0, 0, 0.2)", // شیشه‌ای
        borderWidth: 4,
        pointRadius: 0, // مخفی کردن نقاط
        showLine: true,
        tension: 0.3, // نرمی خط
      },
      {
        label: "حجم بازار",
        data: volumes.map((volume, index) => ({ x: dates[index], y: volume })),
        backgroundColor: blueColor.trim(),
        borderColor: blueColor.trim(),
        borderWidth: 1,
        type: "bar",
        barThickness: 20, // Increase bar thickness
        categoryPercentage: 1.0, // Full width bars
        barPercentage: 1.0, // No gap between bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "IranSans", // فونت دلخواه برای لیبل‌های راهنمای نمودار
            size: 11, // اندازه فونت
            weight: "bold", // ضخامت فونت
            lineHeight: 1, // فاصله بین خطوط
          },
          color: "#333", // رنگ فونت
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.dataset.type === "bar") {
              return `حجم بازار: ${tooltipItem.raw.y}`;
            }
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.y}`;
          },
        },
        titleFont: {
          family: "IranSans", // فونت برای عنوان‌های tooltip
          size: 12,
        },
        bodyFont: {
          family: "IranSans", // فونت برای بدنه tooltip
          size: 12,
        },
      },
    },
    scales: {
      x: {
        type: "category",
        position: "bottom",
        title: {
          display: true,
          text: "تاریخ",
          font: {
            family: "IranSans", // فونت برای عنوان محور x
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            family: "IranSans", // فونت برای اعداد محور x
            size: 12,
          },
          color: "#666", // رنگ فونت اعداد محور x
        },
      },
      y: {
        title: {
          display: true,
          text: "قیمت / حجم",
          font: {
            family: "IranSans", // فونت برای عنوان محور y
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            family: "IranSans", // فونت برای اعداد محور y
            size: 12,
          },
          color: "#666", // رنگ فونت اعداد محور y
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${
            timeRange === "7" ? styles.active : ""
          }`}
          onClick={() => setTimeRange("7")}
        >
          7 روز
        </button>
        <button
          className={`${styles.button} ${
            timeRange === "30" ? styles.active : ""
          }`}
          onClick={() => setTimeRange("30")}
        >
          30 روز
        </button>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MarketChart;
