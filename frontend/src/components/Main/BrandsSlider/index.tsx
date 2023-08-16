import React, { useState } from 'react';
import styles from './BrandsSlider.module.scss';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import BrandsLine from './BrandsLine';
import classNames from 'classnames';

const BrandsSlider = () => {
  return (
    <div className={styles.brands}>
      <div className={classNames(styles.carousel__gradient, styles.carousel__gradient_left)}></div>
      <div className={classNames(styles.carousel__gradient, styles.carousel__gradient_right)}></div>
      <h2 className={styles.brands__title}>Бренды</h2>
      <div className={styles.brands__linkMore}>
        <Link to='/brands'>Посмотреть все</Link>
      </div>
      <BrandsLine rtl={true} />
      <BrandsLine rtl={false} />
    </div>
  );
};

export default BrandsSlider;
