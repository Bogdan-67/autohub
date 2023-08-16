import React, { Suspense, useState } from 'react';
import styles from './BrandsSlider.module.scss';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Slider from 'react-slick';
import brands from './brands.json';
import { Link } from 'react-router-dom';

const BrandsLine = ({ rtl }) => {
  const sliderSettings = {
    slidesToShow: 6,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 1000, settings: { slidesToShow: 6 } },
    ],
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 15000, // ms
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    rtl: rtl,
  };

  return (
    <div className={styles.carousel}>
      <Slider {...sliderSettings}>
        {brands.map((brand, index) => (
          <Link to={'/brands/' + brand.link} key={index}>
            <div
              className={styles.carousel__slide}
              style={{
                background: `url("${brand.img}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}></div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default BrandsLine;
