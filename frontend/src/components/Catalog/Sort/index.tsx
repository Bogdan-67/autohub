import React, { useState } from 'react';
import styles from './Sort.module.scss';

const sortTypes = [
  {
    name: 'цена по возрастанию',
    sort: 'price',
    order: 'asc',
  },
  {
    name: 'цена по убыванию',
    sort: 'price',
    order: 'desc',
  },
  {
    name: 'по алфавиту (А-Я)',
    sort: 'name',
    order: 'asc',
  },
  {
    name: 'по алфавиту (Я-А)',
    sort: 'name',
    order: 'desc',
  },
];

const Sort = () => {
  const [sort, setSort] = useState(sortTypes[1]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.sort}>
      <label className={styles.sort__label}>Сортировка:</label>
      <span onClick={() => setIsOpen(!isOpen)} className={styles.sort__selected}>
        {sort.name}
        {isOpen && (
          <ul className={styles.sort__list}>
            {sortTypes.map((item) => (
              <li
                className={styles.sort__list__item}
                onClick={() => {
                  setIsOpen(!isOpen);
                  setSort(item);
                }}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </span>
    </div>
  );
};

export default Sort;
