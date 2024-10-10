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
  (response) => response, // اگر پاسخ موفقیت‌آمیز باشد، آن را برمی‌گرداند
  async (error) => {
    const originalRequest = error.config;

    // بررسی وضعیت 401 و اینکه آیا این درخواست قبلاً تلاش شده است
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // نشان دادن اینکه درخواست قبلاً تلاش شده است

      if (isRefreshing) {
        // اگر در حال حاضر در حال نوسازی توکن هستیم
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(api(originalRequest)); // زمانی که توکن جدید دریافت شد، درخواست اصلی را دوباره ارسال کنید
          });
        });
      }

      isRefreshing = true; // تغییر وضعیت نوسازی توکن

      try {
        const refreshToken = Cookies.get("refreshToken"); // دریافت توکن رفرش از کوکی‌ها
        console.log("refreshToken api:", refreshToken);
        const response = await axios.post(
          Config.getApiUrl("login", "refreshToken"),
          { refresh: refreshToken }, // ارسال توکن رفرش به سرور
          { withCredentials: true }
        );

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data; // فرض بر این است که هر دو توکن را دریافت کرده‌اید
          Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // تنظیم زمان انقضا برای توکن دسترسی
          Cookies.set("refreshToken", refreshToken, { expires: 7 }); // تنظیم زمان انقضا برای توکن رفرش
          onRefreshed(); // فراخوانی درخواست‌های معلق
          isRefreshing = false; // بازگشت به وضعیت عادی
          return api(originalRequest); // ارسال دوباره درخواست اصلی
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        isRefreshing = false; // بازگشت به وضعیت عادی در صورت خطا
        window.location.href = "/"; // هدایت به صفحه ورود در صورت خطا
      }
    }

    return Promise.reject(error); // در غیر اینصورت خطا را برمی‌گرداند
  }
);

export default api; // صادرات api برای استفاده در دیگر قسمت‌ها
