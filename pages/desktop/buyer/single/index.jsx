import { useRouter } from 'next/router';
import DesktopNavBar from "@/components/navbar/DesktopNavBar";
import UserCard from "@/components/profile/user/UserCard";
import AnimatedButton from "@/components/utils/Button/AnimatedButton";
import styles from "../../../../styles/styleBuySingle.module.css"; // وارد کردن استایل
import SingleCard from "@/components/bazar/Single/SingleCard";
import PriceList from "@/components/bazar/Single/PriceList";
import ProposerCard from "@/components/bazar/ProposerCard/ProposerCard";

const Index = () => {
  const router = useRouter();
  const { color } = router.query; // دریافت پارامتر color از URL
  const fakeImages = [
    "/images/mazafati.jpg",
    "/images/rabbi.jpg",
    "/images/piarom1.jpg",
  ];

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

  const proposer = {
    name: "علیرضا نبی",
    image: "/images/avatar.png",
    price: 89000,
    total_price: 267000000,
    status: "در حال بررسی",
  };

  return (
    <div className={styles.container}>
      <DesktopNavBar />

      <div className={styles.layout}>
        <div className={styles.right}>
          <UserCard
            imageUrl="/images/avatar.png"
            name="علی محمدی"
            profileLink="/profile/alimohammadi"
          />

          <div className={styles.bider_right}>
            <AnimatedButton
              title="ثبت پیشنهـاد قیمت"
              href="/learn-more"
              color="green"
            />
            <p>
              اگر محصولی با این مشخصات دارید می توانید به این خریدار پیشنهاد
              فروش محصول خود را با قیمت مورد نظر خودتان بدهید
            </p>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.gridContainer}>
            <SingleCard
              color={color}
              images={fakeImages}
              description="این یک توضیحات فیک است."
              qrValue="https://example.com"
            />
            <ProposerCard proposer={proposer} color={color} />
            <ProposerCard proposer={proposer} color={color} />
            <ProposerCard proposer={proposer} color={color} />
            <ProposerCard proposer={proposer} color={color} />
            <ProposerCard proposer={proposer} color={color} />
          </div>
        </div>
        <div className={styles.left}>
          <PriceList items={items} color={color} />
        </div>
      </div>
    </div>
  );
};

export default Index;
