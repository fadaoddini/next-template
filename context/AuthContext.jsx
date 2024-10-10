// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import useCheckToken from 'hook/useCheckToken'; // فرض می‌کنیم useCheckToken موجود است

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const isLoggedIn = useCheckToken(); // استفاده از هوک بررسی توکن
  const [authStatus, setAuthStatus] = useState(isLoggedIn);

  useEffect(() => {
    setAuthStatus(isLoggedIn); // وقتی وضعیت توکن تغییر می‌کند، authStatus به‌روزرسانی می‌شود
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
