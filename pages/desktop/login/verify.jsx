import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"; // اطمینان حاصل کنید که این Context را ایجاد کرده‌اید
import axios from "axios";
import styles from "../../../styles/styleVerify.module.css"; // وارد کردن استایل
import Config from "config/config";
import Image from "next/image";

const Verify = () => {
  const { authStatus, setAuthStatus } = useAuth(false); // وضعیت احراز هویت
  const router = useRouter();
  const { mobile } = router.query; // دریافت شماره موبایل از query
  const [code, setCode] = useState(["", "", "", ""]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [timeLeft, setTimeLeft] = useState(120); // 2 دقیقه معادل 120 ثانیه

  useEffect(() => {
    console.log("authStatus in Verify:", authStatus); // بررسی وضعیت
    if (authStatus) {
      router.push("/bazar");
    }
  }, [authStatus, router]);

  // تنظیم تایمر
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setToast({ message: "زمان شما به پایان رسید.", type: "error" });
          router.push("/login"); // هدایت به صفحه ورود بعد از پایان زمان
          return 0; // متوقف کردن تایمر
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // پاک کردن تایمر در هنگام Unmount
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // فوکوس به خانه بعدی
      if (index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) {
      setToast({ message: "لطفاً کد ۴ رقمی را وارد کنید.", type: "error" });
      return;
    }
  
    try {
      const response = await axios.post(
        Config.getApiUrl("login", "verifyCode"),
        { mobile: mobile, code: enteredCode },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        console.log("پاسخ دریافتی:", response.data);
        setAuthStatus(true); // فقط پس از موفقیت کد، تغییر وضعیت احراز هویت
      } else {
        setToast({
          message: response.data.message || "کد تأیید نادرست است.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({
        message: "خطایی رخ داده است، لطفاً دوباره تلاش کنید.",
        type: "error",
      });
    }
  };
  

  return (
    <div className={styles.verify_wrapper}>
      <div className={styles.verify_container}>
        <Image
          src="/images/logo.png"
          alt="rebo"
          className={styles.logo}
          width={100}
          height={100}
        />
        <h1>تأیید</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.code_container}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                className={styles.code_input}
              />
            ))}
          </div>
          <button type="submit">تأیید</button>
        </form>
        <div className={styles.timer}>
          {`زمان باقی‌مانده: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
            .toString()
            .padStart(2, "0")}`}
        </div>
        {toast.message && (
          <div
            className={`${styles.toast} ${
              toast.type === "error" ? styles.error : styles.success
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
