import React, { FC, useEffect, useState } from 'react';
import styles from './Categories.module.scss';
import { useAppDispatch } from '../../../../redux/store';
import { SelectCategory, clearCategory } from '../../../../redux/slices/filterSlice';
import { useSelector } from 'react-redux';
import FilterBlock from '../FilterBlock';
import { useAppSelector } from '../../../../hooks/redux';
import { SelectCategoriesList, fetchCategories } from '../../../../redux/slices/categoriesSlice';
import CategoriesList from '../../../common/CategoriesList';

const Categories = () => {
  const category = useSelector(SelectCategory);
  const categories = useAppSelector(SelectCategoriesList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <FilterBlock
      clearFunc={() => dispatch(clearCategory())}
      title={'Категории'}
      isSelected={!!category}>
      <div className={styles.categories}>
        <CategoriesList />
      </div>
    </FilterBlock>
  );
};

export default Categories;
