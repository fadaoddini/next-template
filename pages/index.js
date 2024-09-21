export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent);

  // مسیر مناسب را برای رندر کردن بر اساس نوع دستگاه تعیین کنید
  return {
    props: {
      isMobile,
    },
  };
}

const Home = ({ isMobile }) => {
  // اگر موبایل باشد، کامپوننت مربوط به موبایل را لود کنید
  if (isMobile) {
    return <MobileHome />;
  }

  // اگر دسکتاپ باشد، کامپوننت مربوط به دسکتاپ را لود کنید
  return <DesktopHome />;
};

// بارگذاری کامپوننت‌های مربوطه از پوشه‌های مخصوص
import MobileHome from './mobile';
import DesktopHome from './desktop';

export default Home;
