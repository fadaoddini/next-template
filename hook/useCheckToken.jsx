import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Config from "config/config";


const useCheckToken = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      const csrfToken = Cookies.get("csrftoken"); // گرفتن CSRF token از کوکی

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            Config.getApiUrl("login", "refreshToken"),
            { refresh: refreshToken },
            {
              withCredentials: true,
              headers: {
                'X-CSRFToken': csrfToken, // اضافه کردن CSRF token به هدر درخواست
              },
            }
          );

          if (refreshResponse.status === 200) {
           
            setIsLoggedIn(true);
          } else {
            console.log("نوسازی توکن موفقیت‌آمیز نبود");
            setIsLoggedIn(false);
          }
        } catch (refreshError) {
          
          setIsLoggedIn(false);
        }
      } else {
        
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  return isLoggedIn;
};

export default useCheckToken;
