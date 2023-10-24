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
import SelectFilter from './SelectFilter';
import { fetchGoods } from '../../../redux/slices/goodSlice';

const Filter: React.FC = () => {
  const category = useAppSelector(SelectCategory);
  const dispatch = useAppDispatch();
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: string[] }>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<{
    [key: string]: string[];
  }>(null);

  const getFiltersByCategory = async (category: number) => {
    await FilterService.fetchFilters(category).then((response) => {
      const data = response.data;
      setCategoryFilters(data);
      const features: { [key: string]: string[] } = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          features[key] = [];
        }
      }
      setSelectedFeatures(features);
      console.log(data);
    });
  };

  useEffect(() => {
    if (category) {
      getFiltersByCategory(category);
    }
  }, [category]);

  useEffect(() => {
    console.log(selectedFeatures);
    dispatch(fetchGoods({ categoryId: category, filters: selectedFeatures }));
  }, [category, selectedFeatures]);

  return (
    <section className={styles.filter}>
      <div className={styles.filter__header}>
        <h4 className={styles.filter__header__title}>Фильтры</h4>
        <span className={styles.filter__header__separator}></span>
        <button
          className={styles.filter__header__refresh}
          title='Сбросить фильтры'
          onClick={() => {
            dispatch(clearFilter());
            setCategoryFilters(null);
            setSelectedFeatures(null);
          }}>
          <img src={refresh} alt='refresh' />
        </button>
      </div>
      <Categories />
      <Price />
      <BrandsFilter />
      {categoryFilters &&
        Object.entries(categoryFilters).map((filter) => {
          const filterName = filter[0];
          const filterData = filter[1];

          return (
            <SelectFilter
              title={filterName}
              items={filterData}
              selectedItems={selectedFeatures[filterName]}
              addItem={(selected) => {
                let features = selectedFeatures;
                if (features[filterName]) {
                  features[filterName].push(selected);
                  setSelectedFeatures({ ...features });
                }
              }}
              removeItem={(selected) => {
                let features = selectedFeatures;
                const indexOf = features[filterName].findIndex((item) => item === selected);
                features[filterName].splice(indexOf, 1);
                setSelectedFeatures({ ...features });
              }}
              clearItems={() => {
                let features = selectedFeatures;
                features[filterName] = [];
                setSelectedFeatures({ ...features });
              }}
            />
          );
        })}
    </section>
  );
};

export default Filter;
