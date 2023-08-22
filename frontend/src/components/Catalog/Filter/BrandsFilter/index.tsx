import React, { useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import styles from './BrandsFilter.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
  SelectBrands,
  addBrand,
  clearBrands,
  removeBrand,
} from '../../../../redux/slices/filterSlice';
import brands from '../../../Main/BrandsSlider/brands.json';
import FilterBlock from '../FilterBlock';

const BrandsFilter = () => {
  const selectedBrands = useSelector(SelectBrands);
  const dispatch = useAppDispatch();

  const handleClick = (id: number) => {
    if (selectedBrands.includes(id)) {
      dispatch(removeBrand(id));
    } else {
      dispatch(addBrand(id));
    }
  };

  return (
    <FilterBlock
      clearFunc={() => dispatch(clearBrands())}
      title={'Брэнды'}
      isSelected={!!selectedBrands.length}>
      <ul className={styles.brands__list}>
        {brands.map((brand) => (
          <li
            key={brand.id}
            className={classNames(styles.brand, {
              [styles.active]: selectedBrands.includes(brand.id),
            })}
            onClick={() => handleClick(brand.id)}>
            <span
              className={classNames(styles.checkbox, {
                [styles.checkbox_checked]: selectedBrands.includes(brand.id),
              })}></span>
            {brand.name}
          </li>
        ))}
      </ul>
    </FilterBlock>
  );
};

export default BrandsFilter;
