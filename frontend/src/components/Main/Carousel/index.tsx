import React, { useState } from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';

const Carousel = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    fade: true,
    speed: 900, // ms
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const cards = [
    {
      img: 'https://dealer-center.ru/upload/iblock/47d/0kjkigwd5ig7xqz6ggwqu6eawjj5nmou/Gravity-banner.jpg',
      title: 'Gravity',
      description: 'Профессиональные стойки и аксессуары Gravity концерна Adam Hall Group',
      pricingText: 'USD 50/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      img: 'https://dealer-center.ru/upload/iblock/c7e/8mrhv3o6lues589yd58187aaczoj6cfz/Clay-Paky-banner.jpg',
      title: 'Skylos',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 50/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      img: 'https://dealer-center.ru/upload/iblock/ecf/ch8tys3sbp8g0lshzotqf57wgeugswk3/Studiomaster-banner.jpg',
      title: 'Studiomaster',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 50/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
  ];

  return (
    <div className={styles.carousel}>
      <button className={styles.slickPrev} onClick={sliderRef?.slickPrev}>
        <LiaAngleLeftSolid />
      </button>
      <button className={styles.slickNext} onClick={sliderRef?.slickNext}>
        <LiaAngleRightSolid />
      </button>
      <Slider ref={setSliderRef} {...sliderSettings}>
        {cards.map((card, index) => (
          <div key={index}>
            <div
              className={styles.carousel__slide}
              style={{
                background: `url("${card.img}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}>
              <div className={styles.carousel__gradient}></div>
              <div className={styles.carousel__slide__content}>
                <h2 className={styles.carousel__slide__title}>{card.title}</h2>
                <p className={styles.carousel__slide__text}>{card.description}</p>

                <button className={styles.carousel__slide__btn}>Подробнее</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
