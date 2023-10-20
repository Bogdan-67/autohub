import React, { useEffect, useState } from 'react';
import styles from './BrandsSlider.module.scss';
import { Link } from 'react-router-dom';
import BrandsLine from './BrandsLine';
import classNames from 'classnames';
import BrandService from '../../../services/BrandService';
import { IBrand } from '../../../models/IBrand';

const BrandsSlider = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);

  const fetchBrands = async () => {
    await BrandService.getBrands()
      .then((response) => {
        setBrands(response.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    console.log(brands);
  }, [brands]);

  if (!brands || brands.length === 0) return <></>;

  return (
    <div className={styles.brands}>
      <div className={classNames(styles.carousel__gradient, styles.carousel__gradient_left)}></div>
      <div className={classNames(styles.carousel__gradient, styles.carousel__gradient_right)}></div>
      <h2 className={styles.brands__title}>Бренды</h2>
      <div className={styles.brands__linkMore}>
        <Link to='/brands'>Посмотреть все</Link>
      </div>
      {/* TODO Когда брендов будет много отправлять по половине на линии */}
      <BrandsLine rtl={true} brands={brands} />
      <BrandsLine rtl={false} brands={brands} />
    </div>
  );
};

export default BrandsSlider;
