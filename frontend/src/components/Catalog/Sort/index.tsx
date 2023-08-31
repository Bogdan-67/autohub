import React, { useRef, useState } from 'react';
import styles from './Sort.module.scss';
import { SelectSort, SortPropertyEnum, setSort } from '../../../redux/slices/filterSlice';
import { useAppSelector } from '../../../hooks/redux';
import { useAppDispatch } from '../../../redux/store';
import classNames from 'classnames';
import useOnClickOutside from '../../../hooks/onClickOutside';

const sortTypes = [
  {
    name: 'цена по возрастанию',
    sortProperty: SortPropertyEnum.PRICE_ASC,
  },
  {
    name: 'цена по убыванию',
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  {
    name: 'по алфавиту (А-Я)',
    sortProperty: SortPropertyEnum.TITLE_ASC,
  },
  {
    name: 'по алфавиту (Я-А)',
    sortProperty: SortPropertyEnum.TITLE_DESC,
  },
];

const Sort = () => {
  const sort = useAppSelector(SelectSort);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={styles.sort}>
      <label className={styles.sort__label}>Сортировка:</label>
      <span onClick={() => setIsOpen(!isOpen)} className={styles.sort__selected}>
        {sort.name}
      </span>
      {isOpen && (
        <ul ref={ref} className={styles.sort__list}>
          {sortTypes.map((item) => (
            <li
              className={classNames(styles.sort__list__item, {
                [styles.selected]: item.sortProperty === sort.sortProperty,
              })}
              onClick={() => {
                setIsOpen(!isOpen);
                dispatch(setSort(item));
              }}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sort;
