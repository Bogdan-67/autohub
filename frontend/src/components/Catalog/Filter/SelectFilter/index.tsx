import { FC } from 'react';
import styles from './SelectFilter.module.scss';
import classNames from 'classnames';
import FilterBlock from '../FilterBlock';
import { SelectFilterProps } from './SelectFilter.props';

const SelectFilter: FC<SelectFilterProps> = ({
  title,
  items,
  selectedItems,
  addItem,
  removeItem,
  clearItems,
}) => {
  const handleClick = (item: string) => {
    if (selectedItems.includes(item)) {
      removeItem(item);
    } else {
      addItem(item);
    }
  };

  return (
    <FilterBlock clearFunc={() => clearItems()} title={title} isSelected={!!selectedItems.length}>
      <ul className={styles.brands__list}>
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames(styles.brand, {
              [styles.active]: selectedItems.includes(item),
            })}
            onClick={() => handleClick(item)}>
            <span
              className={classNames(styles.checkbox, {
                [styles.checkbox_checked]: selectedItems.includes(item),
              })}></span>
            {item}
          </li>
        ))}
      </ul>
    </FilterBlock>
  );
};

export default SelectFilter;
