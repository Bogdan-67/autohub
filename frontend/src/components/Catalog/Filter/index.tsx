import React from 'react';
import Categories from './Categories';
import styles from './Filter.module.scss';
import refresh from '../../../assets/refresh.svg';
import BrandsFilter from './BrandsFilter';
import { useAppDispatch } from '../../../redux/store';
import { clearFilter } from '../../../redux/slices/filterSlice';

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <section className={styles.filter}>
      <div className={styles.filter__header}>
        <h4 className={styles.filter__header__title}>Фильтры</h4>
        <span className={styles.filter__header__separator}></span>
        <button
          className={styles.filter__header__refresh}
          title='Сбросить фильтры'
          onClick={() => dispatch(clearFilter())}>
          <img src={refresh} alt='refresh' />
        </button>
      </div>
      <Categories />
      <BrandsFilter />
    </section>
  );
};
export default Filter;
