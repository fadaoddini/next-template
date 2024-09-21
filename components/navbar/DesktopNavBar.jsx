import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./DesktopNavBar.module.css";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

import logo from "../../public/images/logo.png";
import noPic from "../../public/images/nopic.png";
import question from "../../public/images/question.png";
import exit from "../../public/images/exit.png";
import profile from "../../public/images/profile.png";
import cart from "../../public/images/cart.png";

const DesktopNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [iconSrc, setIconSrc] = useState({
    exit: exit,
    profile: profile,
    question: question,
    cart: cart,
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

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

  const handleConfirmLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setIsDialogOpen(false);
    window.location.href = "/login";
  };

  const handleCancelLogout = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div>
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

                <li className={styles.nav_item}>
                  <Link href="/transport/select" className={styles.nav_link}>
                    حمل و نقل
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <Link href="/shop" className={styles.nav_link}>
                    فروشگاه
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <Link href="/law" className={styles.nav_link}>
                    قوانین
                  </Link>
                </li>
              </ul>

              <div className={styles.left_menu}>
                {isLoggedIn && (
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
                )}

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
                </div>
              </div>
            </nav>
          </div>
        </header>
  
      </div>

      {isDialogOpen && (
        <ConfirmDialog
          message="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </>
  );
};

export default DesktopNavBar;
