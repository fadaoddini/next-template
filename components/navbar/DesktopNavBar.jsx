import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./DesktopNavBar.module.css";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import Cookies from "js-cookie";
import axios from "axios";
import Config from "../../config/config";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"; // استفاده از AuthContext
import logo from "../../public/images/logo.png";
import question from "../../public/images/question.png";
import exit from "../../public/images/exit.png";
import profile from "../../public/images/profile.png";
import cart from "../../public/images/cart.png";

const DesktopNavBar = () => {
  const { authStatus, setAuthStatus } = useAuth(); // گرفتن وضعیت ورود کاربر و تابع به‌روز رسانی
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [iconSrc, setIconSrc] = useState({
    exit: exit,
    profile: profile,
    question: question,
    cart: cart,
  });
  const router = useRouter();

  function getCsrfToken() {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  }

  const handleMouseEnter = (icon) => {
    setIconSrc((prevState) => ({
      ...prevState,
      [icon]: require(`../../public/images/${icon}_hover.png`),
    }));
  };

  const handleMouseLeave = (icon) => {
    setIconSrc((prevState) => ({
      ...prevState,
      [icon]: require(`../../public/images/${icon}.png`),
    }));
  };

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      const csrfToken = getCsrfToken();
      const response = await axios.post(
        Config.getApiUrl("login", "logout"),
        {},
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setAuthStatus(false); // تغییر نام تابع
        router.push("/"); // هدایت به صفحه اصلی
      } else {
        console.error("Logout failed with status:", response.status);
        // نمایش پیام خطا به کاربر
        alert("خروج ناموفق. لطفاً دوباره امتحان کنید.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // نمایش پیام خطا به کاربر
      alert("خطا در خروج. لطفاً دوباره امتحان کنید.");
    } finally {
      setIsDialogOpen(false); // بستن دیالوگ در هر صورت
    }
  };

  const handleCancelLogout = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar_wrapper}>
          <nav className={styles.navbar_container}>
            <Image src={logo} alt="ربو | بورس خرما" className={styles.logo} />
            <ul className={styles.nav_list}>
              <li className={styles.nav_item}>
                <Link href="/" className={styles.nav_link}>
                  خانه
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/bazar" className={styles.nav_link}>
                  بازار عمده
                </Link>
              </li>
              {/* <li className={styles.nav_item}>
                <Link href="/transport/select" className={styles.nav_link}>
                  حمل و نقل
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/shop" className={styles.nav_link}>
                  فروشگاه
                </Link>
              </li> */}
              <li className={styles.nav_item}>
                <Link href="/law" className={styles.nav_link}>
                  قوانین
                </Link>
              </li>
            </ul>

            <div className={styles.left_menu}>
              {authStatus ? (
                <>
                  <div className={styles.tooltip_container}>
                    <Link href="/faq">
                      <Image
                        src={iconSrc.question}
                        alt="سوالات متداول"
                        className={`${styles.icon} ${styles.icon_question}`}
                        onMouseEnter={() => handleMouseEnter("question")}
                        onMouseLeave={() => handleMouseLeave("question")}
                      />
                      <div className={styles.tooltip}>سوالات متداول</div>
                    </Link>
                  </div>
                  <div className={styles.tooltip_container}>
                    <Link href="/profile">
                      <Image
                        src={iconSrc.profile}
                        alt="پروفایل"
                        className={`${styles.icon} ${styles.icon_profile}`}
                        onMouseEnter={() => handleMouseEnter("profile")}
                        onMouseLeave={() => handleMouseLeave("profile")}
                      />
                      <div className={styles.tooltip}>پروفایل</div>
                    </Link>
                  </div>

                  <div className={styles.tooltip_container}>
                    <Image
                      src={iconSrc.exit}
                      alt="خروج"
                      className={`${styles.icon} ${styles.icon_exit}`}
                      onClick={handleLogoutClick}
                      onMouseEnter={() => handleMouseEnter("exit")}
                      onMouseLeave={() => handleMouseLeave("exit")}
                    />
                    <div className={styles.tooltip}>خروج</div>
                  </div>
                </>
              ) : (
                <div className={styles.tooltip_container}>
                  <Link href="/login">
                    <Image
                      src={iconSrc.profile}
                      alt="ورود"
                      className={`${styles.icon} ${styles.icon_profile}`}
                      onMouseEnter={() => handleMouseEnter("profile")}
                      onMouseLeave={() => handleMouseLeave("profile")}
                    />
                    <div className={styles.tooltip}>ورود</div>
                  </Link>
                </div>
              )}

              {/* <div className={styles.tooltip_container}>
                <Link href="/shop/cart">
                  <Image
                    src={iconSrc.cart}
                    alt="سبد خرید"
                    className={`${styles.icon} ${styles.icon_cart}`}
                    onMouseEnter={() => handleMouseEnter("cart")}
                    onMouseLeave={() => handleMouseLeave("cart")}
                  />
                  <div className={styles.tooltip}>سبد خرید</div>
                </Link>
              </div> */}
            </div>
          </nav>
        </div>
      </header>

      {isDialogOpen && (
        <ConfirmDialog
          message="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          isOpen={isDialogOpen}
        />
      )}
    </>
  );
};

export default DesktopNavBar;
