import axios from "axios";
import Cookies from "js-cookie";
import Config from "config/config";

let isRefreshing = false; // برای مدیریت وضعیت نوسازی توکن
let refreshSubscribers = []; // لیستی برای نگهداری درخواست‌های معلق

const api = axios.create({
  baseURL: Config.baseUrl,
  withCredentials: true, // برای ارسال کوکی‌ها با هر درخواست
});

// تابعی برای فراخوانی همه‌ی درخواست‌های معلق بعد از نوسازی توکن
const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = []; // پاک‌سازی لیست بعد از فراخوانی
};

// افزودن interceptor به پاسخ‌های axios
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("Error status:", error.response ? error.response.status : "No response");

    // بررسی اگر خطای 401 (عدم اعتبار توکن) رخ دهد
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // اگر نوسازی توکن قبلاً آغاز شده باشد، درخواست فعلی را منتظر بگذارید
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(api(originalRequest));  // استفاده از api بجای axios
          });
        });
      }

      isRefreshing = true;

      try {
        // درخواست برای دریافت توکن جدید با استفاده از refreshToken
        const response = await axios.post(
          Config.getApiUrl("login", "refreshToken"),
          {},
          { withCredentials: true }
        );

        console.log("Refresh token response:", response.data);

        if (response.status === 200) {
          Cookies.set("accessToken", response.data.accessToken);
          onRefreshed();
          isRefreshing = false;

          return api(originalRequest); // استفاده از api بجای axios
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        isRefreshing = false; // اینجا را هم تنظیم کنید

        window.location.href = "/"; // هدایت به صفحه لاگین در صورت عدم موفقیت
      }
    }

    return Promise.reject(error);
  }
);


export default api; // صادرات api برای استفاده در دیگر قسمت‌ها
