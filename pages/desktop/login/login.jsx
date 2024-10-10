import { useState, useEffect } from "react";

import axios from "axios";

import { useRouter } from "next/router";

import Cookies from "js-cookie";
 // اضافه کردن js-cookie
import Config from "config/config";

import Image from "next/image";

import styles from "../../../styles/styleLogin.module.css";
 // وارد کردن استایل

const Login = () => {
  const [mobile, setMobile] = useState("");

  const [toast, setToast] = useState({ message: "", type: "" });

  const router = useRouter();


  useEffect(() => {
    const accessToken = Cookies.get("access_token");


    if (accessToken) {
      axios
        .get(Config.getApiUrl("v1", "checkToken"), {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === "success") {
            console.log("توکن معتبر است");

            router.push("/");
 // هدایت به صفحه اصلی
          } else {
            handleInvalidToken();

          }
        })
        .catch((error) => {
          console.error("خطا در اعتبارسنجی توکن:", error);

          handleInvalidToken();

        });

    } else {
      router.push("/login");

    }
  }, []);


  const handleInvalidToken = () => {
    Cookies.remove("access_token");

    router.push("/login");

  };

  
  const handleChange = (e) => {
    const value = e.target.value;

    if (toast.message) {
      setToast({ message: "", type: "" });

    }
    if (/^\d{0,9}$/.test(value)) {
      setMobile(value);

    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const mobileNumber = "09" + mobile;

    const mobileRegex = /^09\d{9}$/;


    if (!mobileRegex.test(mobileNumber)) {
      setToast({
        message: 'شماره موبایل باید با "09" شروع شود و 11 رقم باشد.',
        type: "error",
      });

      return;

    }

    try {
      const response = await axios.post(
        Config.getApiUrl("login", "sendOtp"), // استفاده از تابع getApiUrl
        { mobile: mobileNumber },
        { headers: { "Content-Type": "application/json" } }
      );


      const { status } = response.data;


      if (status === "ok") {
        setToast({
          message: `کد تأیید برای شماره ${mobileNumber} ارسال شد.`,
          type: "success",
        });

        router.push({
          pathname: '/verify',
          query: { mobile: mobileNumber }
        });

      } else {
        setToast({
          message: "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
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
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.form_wrapper}>
            <div className={styles.form_container}>
              <Image
                src="/images/logo.png"
                alt="rebo"
                className={styles.logo} 
                width={100}
                height={100}
              />
              <h1>ورود</h1>
              <form onSubmit={handleSubmit}>
                <div className={styles.input_container}>
                  <span className={styles.fixed_text}>09</span>
                  <input
                    type="text"
                    value={mobile}
                    onChange={handleChange}
                    maxLength="9"
                    className={`${styles.input} ${
                      toast.message && !/^0[0-9]{9}$/.test("09" + mobile)
                        ? styles.input_error
                        : ""
                    }`}
                    placeholder="*******"
                  />
                </div>
                <button type="submit">ارسال</button>
              </form>
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
        </div>
      </div>
    </div>
  );

};


export default Login;

