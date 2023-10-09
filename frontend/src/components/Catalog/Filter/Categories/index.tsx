import React, { FC, useState } from 'react';
import styles from './Categories.module.scss';
import categories from './categories.json';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { RxCross2, RxTriangleRight } from 'react-icons/rx';
import classNames from 'classnames';
import { useAppDispatch } from '../../../../redux/store';
import { SelectCategory, clearCategory, setCategory } from '../../../../redux/slices/filterSlice';
import { useSelector } from 'react-redux';
import FilterBlock from '../FilterBlock';

type CategoryProps = {
  id_category: number;
  name: string;
  parent: number;
  link: string;
};

const Category: FC<CategoryProps> = ({ id_category, name, link, parent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const category = useSelector(SelectCategory);
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
        {categories.filter((item: CategoryProps) => item.parent === id_category).length !== 0 && (
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
  const dispatch = useAppDispatch();

  const subcategories = categories.filter((item: CategoryProps) => item.parent === parent);

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
              {categories.filter((item: CategoryProps) => item.parent === subcategory.id_category)
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

const Categories = () => {
  const category = useSelector(SelectCategory);
  const dispatch = useAppDispatch();

  return (
    <FilterBlock
      clearFunc={() => dispatch(clearCategory())}
      title={'Категории'}
      isSelected={!!category}>
      <ul className={styles.categories__list}>
        {categories
          .filter((category: CategoryProps) => category.parent === null)
          .map((category: CategoryProps, index) => (
            <Category key={index} {...category} />
          ))}
      </ul>
    </FilterBlock>
  );
};

export default Categories;
