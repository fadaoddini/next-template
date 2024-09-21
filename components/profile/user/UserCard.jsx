import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./UserCard.module.css";

const UserCard = ({ imageUrl, name, profileLink }) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing); // تغییر وضعیت دنبال کردن
  };

  return (
    <Link href={profileLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl || "/images/avatar.png"} // تصویر پیش‌فرض اگر imageUrl موجود نباشد
            alt="User"
            width={80}
            height={80}
            className={styles.image}
          />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.buttons}>
          {/* شرطی برای نمایش دکمه دنبال کردن یا دنبال نکردن */}
          {isFollowing ? (
            <button
              className={styles.button_unfollow}
              onClick={handleFollowClick}
            >
              دنبال نکردن
            </button>
          ) : (
            <button className={styles.button_follow} onClick={handleFollowClick}>
              دنبال کردن
            </button>
          )}
          <button className={styles.button_sms}>تماس</button>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
