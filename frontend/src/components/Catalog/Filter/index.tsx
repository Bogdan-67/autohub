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
import SelectFilter from './SelectFilter';

const Filter: React.FC = () => {
  const category = useAppSelector(SelectCategory);
  const dispatch = useAppDispatch();
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: SelectItem[] }>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<{
    [key: string]: number[];
  }>(null);

  const SelectItemInNumber = (data: SelectItem[]) => {
    return data.map((item: SelectItem) => item.id);
  };

  const getFiltersByCategory = async (category: number) => {
    await FilterService.fetchFilters(category).then((response) => {
      const data = response.data;
      setCategoryFilters(data);
      const featuresIds: { [key: string]: number[] } = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          featuresIds[key] = SelectItemInNumber(data[key]);
        }
      }
      setSelectedFeatures(featuresIds);
      console.log(data);
    });
  };

  useEffect(() => {
    if (category) {
      getFiltersByCategory(category);
    }
  }, [category]);

  useEffect(() => {
    let filters = new Array();
    for (let key in selectedFeatures) {
      if (selectedFeatures[key] && selectedFeatures[key].length > 0)
        filters = [...filters, ...selectedFeatures[key]];
      else filters = [...filters, ...SelectItemInNumber(categoryFilters[key])];
    }
  }, [selectedFeatures]);

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
      {categoryFilters &&
        Object.entries(categoryFilters).map((filter) => {
          const filterName = filter[0];
          const filterData = filter[1];

          return (
            <SelectFilter
              title={filterName}
              items={filterData}
              selectedItems={selectedFeatures[filterName]}
              addItem={(id) => {
                let features = selectedFeatures;
                if (features.length) {
                  features[filterName].push(id);
                  setSelectedFeatures(features);
                }
              }}
              removeItem={(id) => {
                let features = selectedFeatures;
                const indexOf = features[filterName].findIndex((item) => item === id);
                features[filterName].splice(indexOf, 1);
                setSelectedFeatures(features);
              }}
              clearItems={() => {
                let features = selectedFeatures;
                features[filterName] = [];
                setSelectedFeatures(features);
              }}
            />
          );
        })}
    </section>
  );
};
export default Filter;
