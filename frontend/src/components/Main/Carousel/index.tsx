import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import SliderService from '../../../services/SliderService';
import { ISlider } from '../../../models/ISlider';
import { API_URL } from '../../../http';

const Carousel = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [sliderItems, setSliderItems] = useState<ISlider[]>(null);

  const fetchSliderData = async () => {
    await SliderService.fetchSliderItems()
      .then((response) => setSliderItems(response.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  useEffect(() => {
    console.log('sliderItems', sliderItems);
  }, [sliderItems]);

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

  if (!sliderItems || sliderItems.length === 0) return <></>;

  return (
    <div className={styles.carousel}>
      {sliderItems.length > 1 && (
        <>
          <button className={styles.slickPrev} onClick={sliderRef?.slickPrev}>
            <LiaAngleLeftSolid />
          </button>
          <button className={styles.slickNext} onClick={sliderRef?.slickNext}>
            <LiaAngleRightSolid />
          </button>
        </>
      )}
      <Slider ref={setSliderRef} {...sliderSettings}>
        {sliderItems.map((card) => (
          <div key={card.id}>
            <div
              className={styles.carousel__slide}
              style={{
                background: `url("${API_URL}/${card.img}")`,
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
