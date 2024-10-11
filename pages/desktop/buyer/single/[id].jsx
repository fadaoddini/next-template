import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "config/api"; // استفاده از api که قبلاً تعریف کردیم
import Config from "config/config";
import DesktopNavBar from "@/components/navbar/DesktopNavBar";
import UserCard from "@/components/profile/user/UserCard";
import AddBid from "@/components/bazar/Bid/AddBid"; // وارد کردن کامپوننت AddBid
import styles from "../../../../styles/styleBuySingle.module.css";
import SingleCard from "@/components/bazar/Single/SingleCard";
import PriceList from "@/components/bazar/Single/PriceList";
import ProposerCard from "@/components/bazar/ProposerCard/ProposerCard";

const Index = () => {
  const router = useRouter();
  const { color, id } = router.query;
  const [singleData, setSingleData] = useState(null);
  const [listBids, setListBids] = useState([]);
  const [bidData, setBidData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // بارگذاری اطلاعات کاربر و احراز هویت
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await api.get(Config.getApiUrl("login", `getInfo`));
        setUserInfo(response.data.user);
        setIsAuthenticated(true); // کاربر احراز هویت شده است
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsAuthenticated(false); // کاربر احراز هویت نشده است
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []); // این بارگذاری فقط یکبار در ابتدای بارگذاری کامپوننت انجام می‌شود

  // بارگذاری اطلاعات محصول
  useEffect(() => {
    const fetchSingle = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(
          Config.getApiUrl("catalogue", `${color}/single/${id}/`)
        );
        setSingleData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingle();
  }, [id]);

  // بارگذاری اطلاعات بیدها
  useEffect(() => {
    const fetchListBids = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(
          Config.getApiUrl("catalogue", `${color}/bid/list/${id}/`)
        );
        setListBids(response.data);
        const newItems = response.data.map((bid) => ({
          price: bid.price,
          quantity: bid.weight,
          total: bid.total,
        }));
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListBids();
  }, [id, color]);

  const fetchBid = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await api.get(
        Config.getApiUrl("catalogue", `${color}/bid/${id}/`)
      );
      setBidData(response.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // بارگذاری اطلاعات بیدها
  useEffect(() => {
    fetchBid();
  }, [id]);

  // بارگذاری مجدد لیست بیدها
  // بارگذاری مجدد لیست بیدها
  const refreshBidList = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await api.get(
        Config.getApiUrl("catalogue", `${color}/bid/list/${id}/`)
      );
      setListBids(response.data); // بروزرسانی لیست بیدها
      const newItems = response.data.map((bid) => ({
        price: bid.price,
        quantity: bid.weight,
        total: bid.total,
      }));
      setItems(newItems); // بروزرسانی آیتم‌ها

      // همچنین می‌توانید اطلاعات بیدها را به‌روز کنید
      await fetchBid(); // اطلاعات بیدها را دوباره بارگذاری کنید
    } catch (error) {
      console.error("Error fetching bids:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در بارگذاری داده‌ها</p>;
  if (!singleData) return null;

  const images =
    singleData?.images?.map((image) => `${Config.baseUrl}${image.image}`) || [];
  const attributes = singleData.attrs || [];

  return (
    <div className={styles.container}>
      <DesktopNavBar />
      <div className={styles.layout}>
        <div className={styles.right}>
          {isAuthenticated && (
            <>
              <UserCard
                imageUrl={`${Config.baseUrl}${singleData.user.image}`}
                name={`${singleData.user.first_name} ${singleData.user.last_name}`}
                mobile={singleData.user.mobile}
                userId={singleData.user.id}
                userIdViewer={userInfo.id}
              />
              {isAuthenticated && userInfo.id !== singleData.user.id && (
                <div className={styles.bider_right}>
                  <AddBid
                    productId={id} // شناسه محصول
                    name={singleData.name} // نام محصول
                    lable={singleData.lable} // برچسب محصول
                    top_price_bid={singleData.top_price_bid} // بالاترین قیمت بید
                    onBidSubmitted={refreshBidList} // تابع برای بروزرسانی لیست بیدها
                    onBidListSubmitted={() => {
                      /* عمل مورد نیاز بعد از ارسال لیست بیدها */
                    }} // تابع برای بروزرسانی بعد از ارسال لیست بیدها
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.gridContainer}>
            <SingleCard
              color={color}
              images={images}
              description={singleData.description}
              barcode={singleData.upc}
              weight={singleData.weight}
              price={singleData.price}
              top_price_bid={singleData.top_price_bid}
              count_bid={singleData.count_bid}
              warranty={singleData.warranty}
              lable={singleData.lable}
              name={singleData.name}
              user={singleData.user}
              expireTime={singleData.expire_time}
              attrs={attributes}
            />
            {isAuthenticated &&
              bidData.map((bid, index) => (
                <ProposerCard
                  key={bid.id || index}
                  proposer={{
                    name: bid.user || "ناشناس",
                    image: bid.image_url || "/images/avatar.png",
                    price: bid.price,
                    weight: bid.weight,
                    total_price: bid.total,
                    status: bid.result ? "تایید شده" : "تایید نشده",
                    mobile: bid.mobile,
                  }}
                  color={color}
                />
              ))}
          </div>
        </div>
        <div className={styles.left}>
          <PriceList
            items={items}
            color={color === "sell" ? "buy" : "sell"}
            lable={singleData.lable}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
