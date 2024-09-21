import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./MobileNavBar.module.css"; // Import CSS module

const MobileNavBar = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(2);

  const links = [
    { id: "inbox", text: "بازار", href: "/mobile/bazarM" },
    { id: "profile", text: "حمل و نقل", href: "/mobile/transportM" },
    { id: "home", text: "خانه", href: "/mobile/" },
    { id: "shop", text: "فروشگاه", href: "/mobile/shopM" },
    { id: "law", text: "قوانین", href: "/mobile/lawM" },
  ];

  
  useEffect(() => {
    // تعیین ایندکس فعال بر اساس مسیر فعلی
    const currentPath = router.pathname;
    const index = links.findIndex(link => link.href === currentPath);
    setActiveIndex(index !== -1 ? index : 2); // پیش‌فرض به "خانه" تنظیم شود
  }, [router.pathname]);


  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className={styles.nav}>
      <div
        className={styles.linkBackground}
        style={{ transform: `translateX(${128.25 * activeIndex}%)` }}
      ></div>
      <ul className={styles.menuList}>
        {links.map((link, index) => (
          <li key={link.id} className={styles.menuItem}>
            <Link href={link.href}>
              <span
                className={`${styles.link} ${activeIndex === index ? styles.active : ""}`}
                onClick={() => handleClick(index)}
              >
                {link.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavBar;
