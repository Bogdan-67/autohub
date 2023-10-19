import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import styles from './BrandsFilter.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
  SelectBrands,
  SelectCategory,
  addBrand,
  clearBrands,
  removeBrand,
} from '../../../../redux/slices/filterSlice';
import FilterBlock from '../FilterBlock';
import { useAppSelector } from '../../../../hooks/redux';
import BrandService from '../../../../services/BrandService';
import { IBrand } from '../../../../models/IBrand';

const BrandsFilter = () => {
  const selectedBrands = useSelector(SelectBrands);
  const dispatch = useAppDispatch();
  const category = useAppSelector(SelectCategory);
  const [brands, setBrands] = useState<IBrand[]>([]);

  const handleClick = (id: number) => {
    if (selectedBrands.includes(id)) {
      dispatch(removeBrand(id));
    } else {
      dispatch(addBrand(id));
    }
  };

  const fetchBrands = async (categoryId: number) => {
    await BrandService.getBrands(categoryId)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((e) => console.log(e)); // TODO Сделать обработку ошибки
  };

  useEffect(() => {
    fetchBrands(category);
  }, [category]);

  return (
    <FilterBlock
      clearFunc={() => dispatch(clearBrands())}
      title={'Бренды'}
      isSelected={!!selectedBrands.length}>
      {/* TODO Добавить спиннер */}
      {brands.length === 0 ? (
        <div>Бренды не найдены</div>
      ) : (
        <ul className={styles.brands__list}>
          {brands.map((brand) => (
            <li
              key={brand.id_brand}
              className={classNames(styles.brand, {
                [styles.active]: selectedBrands.includes(brand.id_brand),
              })}
              onClick={() => handleClick(brand.id_brand)}>
              <span
                className={classNames(styles.checkbox, {
                  [styles.checkbox_checked]: selectedBrands.includes(brand.id_brand),
                })}></span>
              {brand.name}
            </li>
          ))}
        </ul>
      )}
    </FilterBlock>
  );
};

export default BrandsFilter;
