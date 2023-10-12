import React, { FC, useEffect, useState } from 'react';
import { ICategory } from '../../../models/ICategory';
import { useAppDispatch } from '../../../redux/store';
import { SelectCategory, setCategory } from '../../../redux/slices/filterSlice';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RxTriangleRight } from 'react-icons/rx';
import styles from './CategoriesList.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import {
  SelectCategories,
  SelectCategoriesList,
  fetchCategories,
} from '../../../redux/slices/categoriesSlice';
import { Status } from '../../../models/Status.enum';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type Props = {};

const Category: FC<ICategory> = ({ id_category, name, parent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const category = useSelector(SelectCategory);
  const categories = useAppSelector(SelectCategoriesList);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
    dispatch(setCategory(id_category));
  };

  return (
    <li key={id_category} className={styles.category}>
      <p
        className={classNames(styles.category__title, {
          [styles.active]: category === id_category,
        })}
        onClick={() => handleClick()}>
        {categories?.filter((item: ICategory) => item.parent === id_category).length !== 0 && (
          <RxTriangleRight className={classNames({ [styles.rotated]: isOpen })} />
        )}
        {name}
      </p>
      {isOpen && <Subcategory parent={id_category} />}
    </li>
  );
};

const Subcategory: FC<{ parent: number }> = ({ parent }) => {
  const [openedCategory, setOpenedCategory] = useState<number>(null);
  const category = useSelector(SelectCategory);
  const categories = useAppSelector(SelectCategoriesList);
  const dispatch = useAppDispatch();

  const subcategories = categories?.filter((item: ICategory) => item.parent === parent);

  const handleClick = (id_category: number) => {
    setOpenedCategory(id_category);
    dispatch(setCategory(id_category));
  };

  return (
    <ul className={styles.subcategories}>
      {subcategories.map((subcategory) => {
        return (
          <li key={subcategory.id_category} className={styles.subcategory}>
            <p
              className={classNames(styles.subcategory__title, {
                [styles.active]: category === subcategory.id_category,
              })}
              onClick={() => handleClick(subcategory.id_category)}>
              {categories?.filter((item: ICategory) => item.parent === subcategory.id_category)
                .length !== 0 && (
                <RxTriangleRight
                  className={classNames({
                    [styles.rotated]: subcategory.id_category === openedCategory,
                  })}
                />
              )}
              {subcategory.name}
            </p>
            {subcategory.id_category === openedCategory && (
              <Subcategory parent={subcategory.id_category} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const CategoriesList = (props: Props) => {
  const categories = useAppSelector(SelectCategoriesList);
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(SelectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <ul className={styles.categories__list}>
      {status === Status.LOADING ? (
        <LoadingSpinner color='#C0C0C0' size={40} />
      ) : status === Status.ERROR ? (
        <div className={styles.noCategories}>{error} :(</div>
      ) : !categories || categories.length === 0 ? (
        <div className={styles.noCategories}>Пока еще не создано ни одной категории</div>
      ) : (
        <>
          {categories
            ?.filter((category: ICategory) => category.parent === null)
            .map((category: ICategory, index) => (
              <Category key={index} {...category} />
            ))}
        </>
      )}
    </ul>
  );
};

export default CategoriesList;
