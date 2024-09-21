import DesktopNavBar from "@/components/navbar/DesktopNavBar";
import styles from "../../../../styles/styleChart.module.css"; // وارد کردن استایل
import DesChartBazar from "@/components/bazar/DesCardBazar/DesChartBazar";
import QueueList from "@/components/bazar/Queue/QueueList";
import MarketChart from "@/components/bazar/ChartCardBazar/MarketChart";

const ChartBazar = ({ color }) => {
  const items = [
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
    { price: "15000", quantity: "5500", total: "72500000" },
    { price: "20000", quantity: "3200", total: "62000000" },
    { price: "10000", quantity: "2000", total: "20000000" },
  ];

  // نمونه داده‌ها
  const sampleData = [
    { date: "2024-08-20", maxPrice: 87000, minPrice: 72000, volume: 75000 },
    { date: "2024-08-21", maxPrice: 88000, minPrice: 73000, volume: 80000 },
    { date: "2024-08-22", maxPrice: 89000, minPrice: 74000, volume: 78000 },
    { date: "2024-08-23", maxPrice: 90000, minPrice: 75000, volume: 79000 },
    { date: "2024-08-24", maxPrice: 91000, minPrice: 76000, volume: 82000 },
    { date: "2024-08-25", maxPrice: 92000, minPrice: 77000, volume: 83000 },
    { date: "2024-08-26", maxPrice: 93000, minPrice: 78000, volume: 84000 },
    { date: "2024-08-27", maxPrice: 94000, minPrice: 79000, volume: 85000 },
    { date: "2024-08-28", maxPrice: 95000, minPrice: 80000, volume: 86000 },
    { date: "2024-08-29", maxPrice: 96000, minPrice: 81000, volume: 87000 },
    { date: "2024-08-30", maxPrice: 97000, minPrice: 82000, volume: 88000 },
    { date: "2024-08-31", maxPrice: 98000, minPrice: 83000, volume: 89000 },
    { date: "2024-09-01", maxPrice: 89000, minPrice: 75000, volume: 85000 },
    { date: "2024-09-02", maxPrice: 95000, minPrice: 80000, volume: 10000 },
    { date: "2024-09-03", maxPrice: 85000, minPrice: 60000, volume: 36000 },
    { date: "2024-09-04", maxPrice: 75000, minPrice: 65000, volume: 16000 },
    { date: "2024-09-05", maxPrice: 85000, minPrice: 80000, volume: 56000 },
    { date: "2024-09-06", maxPrice: 105000, minPrice: 90000, volume: 3000 },
    { date: "2024-09-07", maxPrice: 100000, minPrice: 85000, volume: 27000 },
    { date: "2024-09-08", maxPrice: 95000, minPrice: 82000, volume: 24000 },
    { date: "2024-09-09", maxPrice: 93000, minPrice: 80000, volume: 21000 },
    { date: "2024-09-10", maxPrice: 92000, minPrice: 78000, volume: 20000 },
    { date: "2024-09-11", maxPrice: 91000, minPrice: 76000, volume: 19000 },
    { date: "2024-09-12", maxPrice: 90000, minPrice: 74000, volume: 18000 },
    { date: "2024-09-13", maxPrice: 88000, minPrice: 72000, volume: 17000 },
    { date: "2024-09-14", maxPrice: 87000, minPrice: 71000, volume: 16000 },
    { date: "2024-09-15", maxPrice: 86000, minPrice: 70000, volume: 15000 },
    { date: "2024-09-16", maxPrice: 85000, minPrice: 69000, volume: 14000 },
    { date: "2024-09-17", maxPrice: 84000, minPrice: 68000, volume: 130000 },
    { date: "2024-09-18", maxPrice: 83000, minPrice: 67000, volume: 12000 },
  
  ];
  
  
  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <DesChartBazar
            imageSrc="/images/mazafati.jpg"
            title="خرمای نوع فلان "
            link="/"
            description="
          

خرما یکی از میوه‌های محبوب و مفید است که در بسیاری از مناطق گرمسیر جهان کشت می‌شود. این میوه شیرین و مغذی به دلیل خواص بی‌نظیرش، در طول تاریخ به عنوان منبع انرژی و تغذیه مورد استفاده قرار گرفته است. خرما به طور معمول در کشورهای خاورمیانه و شمال آفریقا به وفور یافت می‌شود و در آشپزی سنتی این مناطق نقش ویژه‌ای دارد.

خرما به خاطر ویتامین‌ها و مواد معدنی فراوانی که دارد، از جمله پتاسیم، منیزیم، ویتامین B6 و آهن، به عنوان یک خوراکی سالم شناخته می‌شود. این میوه به دلیل قندهای طبیعی خود، انرژی زیادی به بدن می‌دهد و به بهبود عملکرد قلب و سیستم گوارش کمک می‌کند.

انواع مختلف خرما شامل خرمای مجول، خرمای زاهدی، خرمای کبکاب و خرمای پیارم می‌باشد که هر کدام ویژگی‌ها و طعم خاص خود را دارند. خرما به صورت تازه یا خشک مصرف می‌شود و در بسیاری از دسرها، شیرینی‌ها و غذاهای مختلف به کار می‌رود.

بسیاری از افراد از خرما به عنوان یک میان‌وعده سالم استفاده می‌کنند و برخی نیز آن را به صورت پوره یا عصاره در تهیه محصولات غذایی مختلف به کار می‌برند. به طور کلی، خرما به دلیل طعم شیرین و خواص غذایی ارزشمندش، جزء محبوب‌ترین میوه‌ها در جهان به شمار می‌آید.

            "
          />
        </div>
        <div className={styles.main}>
          <div className={styles.headerSection}>
          <MarketChart data={sampleData} />
          </div>
          <div className={styles.gridContainer}>
            <QueueList items={items} color="sell" title="صف فروشندگان" />
            <QueueList items={items} color="buy" title="صف خریداران" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartBazar;
