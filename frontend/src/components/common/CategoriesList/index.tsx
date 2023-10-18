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
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import Button from '../Button';

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
      <div
        className={classNames(styles.category__head, {
          [styles.active]: category === id_category,
        })}
        onClick={() => handleClick()}>
        {categories?.filter((item: ICategory) => item.parent === id_category).length !== 0 && (
          <RxTriangleRight
            className={classNames(styles.category__arrow, { [styles.rotated]: isOpen })}
          />
        )}
        <p className={styles.category__title}>{name}</p>
        {category === id_category && (
          <div className={styles.category__buttons}>
            <Button
              title='Создать дочернюю категорию'
              className={classNames(styles.category__btn, styles.category__btn_add)}>
              <BsPlus />
            </Button>
            <Button
              title='Редактировать категорию'
              className={classNames(styles.category__btn, styles.category__btn_edit)}>
              <BsPencil />
            </Button>
            <Button
              title='Удалить категорию'
              className={classNames(styles.category__btn, styles.category__btn_delete)}>
              <BsTrash />
            </Button>
          </div>
        )}
      </div>
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
            <div
              className={classNames(styles.subcategory__head, {
                [styles.active]: category === subcategory.id_category,
              })}
              onClick={() => handleClick(subcategory.id_category)}>
              {categories?.filter((item: ICategory) => item.parent === subcategory.id_category)
                .length !== 0 && (
                <RxTriangleRight
                  className={classNames(styles.category__arrow, {
                    [styles.rotated]: subcategory.id_category === openedCategory,
                  })}
                />
              )}
              <p className={styles.subcategory__title}>{subcategory.name}</p>
              {category === subcategory.id_category && (
                <div className={styles.subcategory__buttons}>
                  <Button
                    title='Создать дочернюю категорию'
                    className={classNames(styles.subcategory__btn, styles.subcategory__btn_add)}>
                    <BsPlus />
                  </Button>
                  <Button
                    title='Редактировать категорию'
                    className={classNames(styles.subcategory__btn, styles.subcategory__btn_edit)}>
                    <BsPencil />
                  </Button>
                  <Button
                    title='Удалить категорию'
                    className={classNames(styles.subcategory__btn, styles.subcategory__btn_delete)}>
                    <BsTrash />
                  </Button>
                </div>
              )}
            </div>
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
    <>
      {status === Status.LOADING ? (
        <div className={styles.noCategories}>
          <LoadingSpinner color='#000' size={40} />
        </div>
      ) : status === Status.ERROR ? (
        <div className={styles.noCategories}>
          <p>
            {error} {':('}
          </p>
        </div>
      ) : !categories || categories.length === 0 ? (
        <div className={styles.noCategories}>
          <p>Пока еще не создано ни одной категории</p>
        </div>
      ) : (
        <>
          <ul className={styles.categories__list}>
            {categories
              ?.filter((category: ICategory) => category.parent === null)
              .map((category: ICategory, index) => (
                <Category key={index} {...category} />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CategoriesList;
