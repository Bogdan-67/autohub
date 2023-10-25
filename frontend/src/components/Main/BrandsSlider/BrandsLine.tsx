import React, { FC, Suspense, useEffect, useState } from 'react';
import styles from './BrandsSlider.module.scss';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../http';
import { IBrand } from '../../../models/IBrand';

type Props = {
  rtl: boolean;
  brands: IBrand[];
};

const BrandsLine: FC<Props> = ({ rtl, brands }) => {
  const sliderSettings = {
    slidesToShow: 5,
    responsive: [
      { breakpoint: 1300, settings: { slidesToShow: 3 } },
      { breakpoint: 1620, settings: { slidesToShow: 4 } },
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
          <Link to={'/brands/' + brand.id_brand} key={index}>
            <div className={styles.carousel__slide}>
              <div
                className={styles.carousel__slide__img}
                style={{
                  background: `url("${API_URL}/brands/${brand.logo}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'contain',
                }}></div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default BrandsLine;
