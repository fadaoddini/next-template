import Image from "next/image"; // برای مدیریت تصاویر
import Link from "next/link"; // برای مدیریت لینک‌ها
import styles from "./CategoryTypeBazar.module.css"; // وارد کردن استایل‌های مرتبط

const CardBgImageByButton = ({ title, description, imageSrc, buttonText, linkUrl, color }) => {
  const fullUrl = `${linkUrl}?color=${color}`;
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <Image
          src={imageSrc} // استفاده از تصویر ورودی
          alt={`${title} Image`}
          layout="fill"
          objectFit="cover"
          className={styles.cardImage}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.copy}>{description}</p>

          {/* استفاده از Link برای لینک دادن دکمه */}
          <Link href={fullUrl} passHref>
            <button className={styles.btn}>{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBgImageByButton;
