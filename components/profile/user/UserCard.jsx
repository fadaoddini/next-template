import { useState, useEffect } from "react";
import axios from "axios";
import Config from "config/config";
import styles from "./UserCard.module.css"; // مطمئن شوید که استایل‌های مناسب را اضافه کنید

const UserCard = ({
  imageUrl: initialImageUrl,
  name,
  mobile,
  userId,
  userIdViewer,
}) => {
  const [isFollowing, setIsFollowing] = useState(false); // حالت پیش‌فرض را false قرار می‌دهیم
  const [imageUrl, setImageUrl] = useState(
    initialImageUrl || "/images/avatar.png"
  );
  const [followersCount, setFollowersCount] = useState(0); // تعداد فالوورها
  const [followingCount, setFollowingCount] = useState(0); // تعداد دنبال‌شده‌ها

  // تابع برای بررسی وضعیت فالو شدن کاربر و گرفتن تعداد فالوورها و دنبال‌شده‌ها
  const checkFollowingStatus = async () => {
    try {
      const response = await axios.get(
        Config.getApiUrl("login", `userDetails/${userId}/`), // فرض کنیم این آدرس API اطلاعات فالوورها را می‌دهد
        { withCredentials: true } // ارسال کوکی‌ها
      );

      // اطمینان از اینکه داده‌ها صحیح است
      if (response.data) {
        setIsFollowing(response.data.isFollowing);
        setFollowersCount(response.data.followers); // دریافت تعداد فالوورها
        setFollowingCount(response.data.following); // دریافت تعداد دنبال‌شده‌ها
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    checkFollowingStatus(); // بررسی وضعیت فالو شدن و گرفتن اطلاعات کاربر در ابتدا
  }, [userId]); // userId به عنوان وابستگی

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        Config.getApiUrl("login", "follow/"), // آدرس API
        { user_id: userId }, // ارسال userId به سرور
        { withCredentials: true } // ارسال کوکی‌ها
      );

      if (response.status === 200 || response.status === 201) {
        setIsFollowing(true); // بلافاصله پس از فالو کردن، وضعیت تغییر کند
        setFollowersCount((prevCount) => prevCount + 1); // افزایش تعداد فالوورها
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.delete(
        Config.getApiUrl("login", "unfollow/"), // آدرس API برای آنفالو
        {
          data: { user_id: userId }, // ارسال userId به سرور
          withCredentials: true, // ارسال کوکی‌ها
        }
      );

      if (response.status === 200 || response.status === 204) {
        setIsFollowing(false); // بلافاصله پس از آنفالو کردن، وضعیت تغییر کند
        setFollowersCount((prevCount) => prevCount - 1); // کاهش تعداد فالوورها
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file); // پیش‌نمایش تصویر
      setImageUrl(imagePreviewUrl); // تنظیم URL تصویر برای نمایش فوری

      const formData = new FormData();
      formData.append("image", file); // اضافه کردن تصویر به FormData

      try {
        const response = await axios.post(
          Config.getApiUrl("login", "setImageUser"), // آدرس API
          formData, // داده‌های ارسال شده
          {
            headers: {
              "Content-Type": "multipart/form-data", // نوع محتوا برای ارسال تصویر
            },
            withCredentials: true, // ارسال کوکی‌ها
          }
        );

        if (response.status === 200) {
          console.log("Image uploaded successfully!");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.main_img}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl} // نمایش تصویر آپلود شده یا پیش‌فرض
            alt="User"
            width={80}
            height={80}
            className={styles.image}
          />
        </div>
        {/* فقط اگر userId و userIdViewer برابر باشند، آیکن دوربین را نمایش دهد */}
        {userId === userIdViewer && (
          <label className={styles.cameraIcon}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }} // مخفی کردن ورودی فایل
            />
            📷 {/* آیکن دوربین */}
          </label>
        )}
      </div>

      <div className={styles.name}>{name}</div>
      <div className={styles.buttons}>
        {/* فقط اگر userId و userIdViewer برابر نباشند، دکمه‌های فالو و آنفالو را نمایش دهد */}
        {userId !== userIdViewer && (
          <>
            {isFollowing ? (
              <button
                className={styles.button_unfollow}
                onClick={handleUnfollow}
              >
                دنبال نکردن
              </button>
            ) : (
              <button className={styles.button_follow} onClick={handleFollow}>
                دنبال کردن
              </button>
            )}
            <a className={styles.button_sms} href={`tel:${mobile}`}>
              تماس
            </a>
          </>
        )}
      </div>

      {/* تعداد فالوورها و دنبال‌شده‌ها */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.icon}>👥</span> {/* آیکن فالوورها */}
          <span>{followersCount} دنبال‌کننده</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.icon}>🔗</span> {/* آیکن دنبال‌شده‌ها */}
          <span>{followingCount} دنبال‌شده</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
