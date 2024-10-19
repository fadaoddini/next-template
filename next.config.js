/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/desktop/', // مسیر واقعی که در پروژه قرار دارد
      },
      {
        source: '/login',
        destination: '/desktop/login/login',
      },
      {
        source: '/verify',
        destination: '/desktop/login/verify',
      },
      {
        source: '/bazar',
        destination: '/desktop/bazar',
      },
      {
        source: '/shop',
        destination: '/desktop/shop/',
      },
      {
        source: '/shop/single/:id',
        destination: '/desktop/shop/single/[id]', // مسیر مقصد واقعی
      },
      {
        source: '/shop/cart',
        destination: '/desktop/shop/cart',
      },
      {
        source: '/shop/address',
        destination: '/desktop/shop/address',
      },
      {
        source: '/shop/review',
        destination: '/desktop/shop/review',
      },
      {
        source: '/shop/finalInvoice',
        destination: '/desktop/shop/finalInvoice',
      },
      {
        source: '/driver',
        destination: '/desktop/transport/driver',
      },
      {
        source: '/owner',
        destination: '/desktop/transport/owner',
      },
      {
        source: '/transport/select',
        destination: '/desktop/transport/choose',
      },
      {
        source: '/law',
        destination: '/desktop/law',
      },
      {
        source: '/buyer',
        destination: '/desktop/buyer',
      },
      {
        source: '/sell_buy',
        destination: '/desktop/sell_buy',
      },
      {
        source: '/bazar/details',
        destination: '/desktop/buyer/details',
      },
      {
        source: '/bazar/single/:id',
        destination: '/desktop/buyer/single/:id',
      },
      {
        source: '/bazar/chart/:id', // مسیر قدیمی با پارامتر
        destination: '/desktop/buyer/chart/[id]', // مسیر جدید با پارامتر
      }
    ];
  },
  
  images: {
    domains: ['localhost'], // اضافه کردن localhost به لیست دامنه‌های معتبر
  },
};

module.exports = nextConfig;
