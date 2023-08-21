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
  id_type: number;
  type_name: string;
  parent: number;
  link: string;
};

const Category: FC<CategoryProps> = ({ id_type, type_name, link, parent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const category = useSelector(SelectCategory);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
    dispatch(setCategory(id_type));
  };

  return (
    <li key={id_type} className={styles.category}>
      <p
        className={classNames(styles.category__title, { [styles.active]: category === id_type })}
        onClick={() => handleClick()}>
        <RxTriangleRight className={classNames({ [styles.rotated]: isOpen })} />
        {type_name}
      </p>
      {isOpen && <Subcategory parent={id_type} />}
    </li>
  );
};

const Subcategory: FC<{ parent: number }> = ({ parent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const category = useSelector(SelectCategory);
  const dispatch = useAppDispatch();

  const subcategories = categories.filter((item: CategoryProps) => item.parent === parent);

  const handleClick = (id_type: number) => {
    setIsOpen(!isOpen);
    dispatch(setCategory(id_type));
  };

  return (
    <ul className={styles.subcategories}>
      {subcategories.map((subcategory) => {
        return (
          <li key={subcategory.id_type} className={styles.subcategory}>
            <p
              className={classNames(styles.subcategory__title, {
                [styles.active]: category === subcategory.id_type,
              })}
              onClick={() => handleClick(subcategory.id_type)}>
              <RxTriangleRight className={classNames({ [styles.rotated]: isOpen })} />
              {subcategory.type_name}
            </p>
            {isOpen && <Subcategory parent={subcategory.id_type} />}
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
          .map((category: CategoryProps) => (
            <Category {...category} />
          ))}
      </ul>
    </FilterBlock>
  );
};

export default Categories;
