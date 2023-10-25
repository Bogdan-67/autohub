import React, { useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import styles from './Price.module.scss';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import FilterBlock from '../FilterBlock';
import './multislider.css';
import { useSelector } from 'react-redux';
import {
  SelectPrices,
  clearPrices,
  setMaxPrice,
  setMinPrice,
} from '../../../../redux/slices/filterSlice';

const Price = () => {
  const prices = useSelector(SelectPrices);
  const dispatch = useAppDispatch();
  // TODO: Сделать фильтрацию по цене
  return (
    <FilterBlock
      title={'Цена'}
      clearFunc={() => dispatch(clearPrices())}
      isSelected={prices.min !== 0 || prices.max !== 1000}>
      <div className={styles.content}>
        <div className={styles.prices}>
          <div className={styles.prices__box}>
            <label className={styles.prices__label}>От:</label>
            <input
              type='text'
              value={prices.min}
              onChange={(e) => dispatch(setMinPrice(+e.target.value))}
              className={styles.prices__input}
            />
          </div>
          <div className={styles.prices__box}>
            <label className={styles.prices__label}>До:</label>
            <input
              type='text'
              value={prices.max}
              onChange={(e) => dispatch(setMaxPrice(+e.target.value))}
              className={styles.prices__input}
            />
          </div>
        </div>
        <div className={styles.slider}>
          <MultiRangeSlider
            min={0}
            max={100}
            step={1}
            minValue={prices.min}
            maxValue={prices.max}
            onInput={(e: ChangeResult) => {
              dispatch(setMinPrice(e.minValue));
              dispatch(setMaxPrice(e.maxValue));
            }}
            style={{ border: 'none', boxShadow: 'none', padding: '15px 0px' }}
            label='false'
            ruler='false'
            barLeftColor='#DE9179'
            barInnerColor='#171717'
            barRightColor='#DE9179'
            thumbLeftColor='#171717'
            thumbRightColor='#171717'></MultiRangeSlider>
        </div>
      </div>
    </FilterBlock>
  );
};

export default Price;
