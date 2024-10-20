import axios from "axios";

import Config from "config/config";


// تابع ارسال فرم فروشگاه به سرور
export const addShop = async (formData) => {
  const formDataWithFile = new FormData();

  Object.keys(formData).forEach((key) => {
    formDataWithFile.append(key, formData[key]);

  });


  try {
    const url = Config.getApiUrl("shop", "add_shop");

    const response = await axios.post(url, formDataWithFile, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


export const checkUserShop = async () => {
  try {
    const url = Config.getApiUrl("shop", "check_shop");

    const response = await axios.get(url, { withCredentials: true });

    return response.data;
 // داده مربوط به فروشگاه
  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع ارسال فرم محصول به سرور
export const addProduct = async (formData) => {
  const formDataWithFile = new FormData();

  Object.keys(formData).forEach((key) => {
    formDataWithFile.append(key, formData[key]);

  });


  try {
    const url = Config.getApiUrl("shop", "add-product/");

    const response = await axios.post(url, formDataWithFile, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع دریافت دسته‌بندی‌ها
export const fetchCategories = async () => {
  try {
    const url = Config.getApiUrl("shop", "categories");

    const response = await axios.get(url, { withCredentials: true });


    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع برای دریافت زیرمجموعه‌های دسته‌بندی
export const fetchChildCategories = async (parentId) => {
  try {
    const url = Config.getApiUrl(
      "shop",
      `categories/children/${parseInt(parentId, 10)}/`
    );

    const response = await axios.get(url, { withCredentials: true });


    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع دریافت بسته‌ها
export const fetchPackages = async () => {
  try {
    const url = Config.getApiUrl("shop", "packages/");

    const response = await axios.get(url, { withCredentials: true });


    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع دریافت محصولات غیر فعال
export const fetchInactiveProducts = async () => {
  try {
    const url = Config.getApiUrl("shop", "products/inactive/");

    const response = await axios.get(url, { withCredentials: true });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع دریافت محصولات فعال
export const fetchActiveProducts = async () => {
  try {
    const url = Config.getApiUrl("shop", "products/active/");

    const response = await axios.get(url, { withCredentials: true });


    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع دریافت محصولات ویژه
export const fetchFeaturedProducts = async () => {
 
  try {
    const url = Config.getApiUrl("shop", "products/featured/");

    const response = await axios.get(url, { withCredentials: true });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};


// تابع ویرایش محصول
export const updateProduct = async (productId, formData) => {
  const formDataWithFile = new FormData();

  Object.keys(formData).forEach((key) => {
    formDataWithFile.append(key, formData[key]);

  });


  try {
    const url = Config.getApiUrl("shop", `edit_product_shop/${productId}/`);

    const response = await axios.put(url, formDataWithFile, { withCredentials: true });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data || "خطای نامشخص";

    throw new Error(errorMessage);

  }
};

