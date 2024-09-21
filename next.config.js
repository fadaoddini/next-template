/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/bazar',
          destination: '/desktop/bazar', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/shop',
          destination: '/desktop/shop/', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/shop/single',
          destination: '/desktop/shop/single', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/shop/cart',
          destination: '/desktop/shop/cart', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/shop/address',
          destination: '/desktop/shop/address', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/shop/review',
          destination: '/desktop/shop/review', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/shop/finalInvoice',
          destination: '/desktop/shop/finalInvoice', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/driver',
          destination: '/desktop/transport/driver', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/owner',
          destination: '/desktop/transport/owner', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/transport/select',
          destination: '/desktop/transport/choose', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/law',
          destination: '/desktop/law', // مسیر واقعی که در پروژه قرار دارد
        },
       
        {
          source: '/buyer',
          destination: '/desktop/buyer', // مسیر واقعی که در پروژه قرار دارد
        },
       
        {
          source: '/sell_buy',
          destination: '/desktop/sell_buy', // مسیر واقعی که در پروژه قرار دارد
        },
       
        {
          source: '/bazar/details',
          destination: '/desktop/buyer/details', // مسیر واقعی که در پروژه قرار دارد
        },
        {
          source: '/bazar/single',
          destination: '/desktop/buyer/single', // مسیر واقعی که در پروژه قرار دارد
        },
       
        {
          source: '/bazar/chart',
          destination: '/desktop/buyer/chart', // مسیر واقعی که در پروژه قرار دارد
        },
       
       
        // اضافه کردن دیگر rewrites در صورت نیاز
      ];
    },
  };
  
  module.exports = nextConfig;
  