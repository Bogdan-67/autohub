import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import styles from './Filter.module.scss';
import refresh from '../../../assets/refresh.svg';
import BrandsFilter from './BrandsFilter';
import { useAppDispatch } from '../../../redux/store';
import { SelectCategory, clearFilter } from '../../../redux/slices/filterSlice';
import Price from './Price';
import { useAppSelector } from '../../../hooks/redux';
import FilterService from '../../../services/FIlterService';
import { SelectItem } from './SelectFilter/SelectFilter.props';

const Filter: React.FC = () => {
  const category = useAppSelector(SelectCategory);
  const dispatch = useAppDispatch();
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: SelectItem }>(null);

  const getFiltersByCategory = async (category: number) => {
    await FilterService.fetchFilters(category).then((response) => {
      setCategoryFilters(response);
    });
  };

  useEffect(() => {
    if (category) {
      getFiltersByCategory(category);
    }
  }, [category]);

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
      <Price />
      <BrandsFilter />
    </section>
  );
};
export default Filter;
