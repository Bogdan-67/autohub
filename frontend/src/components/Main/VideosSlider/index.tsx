import React, { useState } from 'react';
import styles from './VideosSlider.module.scss';
import { Link } from 'react-router-dom';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Slider from 'react-slick';
import ReactPlayer from 'react-player/youtube';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../scss/videosSlider.scss';

const VideosSlider = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    dotsClass: 'slickDots',
  };

  const videos = [
    'https://www.youtube.com/watch?v=hpLXgBRtXZU',
    'https://www.youtube.com/watch?v=RyoryE6q--o',
    'https://www.youtube.com/watch?v=l_ROOFieWO4',
    'https://www.youtube.com/watch?v=4nw2L0D75cY',
  ];

  return (
    <section className={styles.videos}>
      <div className={styles.videos__content}>
        <h2 className={styles.videos__content__title}>Образовательная видео платформа TTT GROUP</h2>
        <p className={styles.videos__content__text}>
          Мы создаём различные видео, которые помогут Вам сделать свой выбор в пользу нашей
          компании.
        </p>
        <Link to='/videos' className={styles.videos__content__link}>
          Смотреть все видео
        </Link>
      </div>
      <div className={styles.videos__slider}>
        <div className={styles.carousel}>
          <button className={styles.slickPrev} onClick={sliderRef?.slickPrev}>
            <LiaAngleLeftSolid />
          </button>
          <button className={styles.slickNext} onClick={sliderRef?.slickNext}>
            <LiaAngleRightSolid />
          </button>
          <Slider ref={setSliderRef} {...sliderSettings}>
            {videos.map((href, index) => (
              <div key={index} className={styles.carousel__slide}>
                <ReactPlayer url={href} className='react-player' width='1177px' height='662px' />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default VideosSlider;
