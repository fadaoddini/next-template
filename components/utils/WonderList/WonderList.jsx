// components/ProductSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './WonderList.module.css';

const WonderList = ({ products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,  // تعداد کارت‌هایی که در لحظه نمایش داده می‌شوند
    slidesToScroll: 1,  // تعداد کارت‌هایی که در هر بار اسکرول حرکت می‌کنند
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className={styles.card}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h3>{product.title}</h3>
            <p>{product.price} تومان</p>
            {product.discount && (
              <span className={styles.discount}>{product.discount}% تخفیف</span>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WonderList;
