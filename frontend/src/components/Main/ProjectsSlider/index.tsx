import React, { useState } from 'react';
import styles from './ProjectsSlider.module.scss';
import { Link } from 'react-router-dom';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Slider from 'react-slick';
import projects from './projects.json';

const ProjectsSlider = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    fade: false,
    speed: 900, // ms
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <div className={styles.projects}>
      <h2 className={styles.projects__title}>
        Наши <span className={styles.projects__title__span}>проекты</span>
      </h2>
      <div className={styles.projects__linkMore}>
        <Link to='/projects'>Посмотреть все</Link>
      </div>
      <div className={styles.carousel}>
        <button className={styles.slickPrev} onClick={sliderRef?.slickPrev}>
          <LiaAngleLeftSolid />
        </button>
        <button className={styles.slickNext} onClick={sliderRef?.slickNext}>
          <LiaAngleRightSolid />
        </button>
        <Slider ref={setSliderRef} {...sliderSettings}>
          {projects.map((project, index) => (
            <div key={index}>
              <div
                className={styles.carousel__slide}
                style={{
                  background: `url("${project.img}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                }}>
                <div className={styles.carousel__slide__overlay}>
                  <h4 className={styles.carousel__slide__title}>{project.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProjectsSlider;
