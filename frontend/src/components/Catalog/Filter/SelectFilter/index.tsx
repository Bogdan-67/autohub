import { FC } from 'react';
import styles from './SelectFilter.module.scss';
import classNames from 'classnames';
import FilterBlock from '../FilterBlock';
import { SelectFilterProps, SelectItem } from './SelectFilter.props';

const SelectFilter: FC<SelectFilterProps> = ({
  title,
  items,
  selectedItems,
  addItem,
  removeItem,
  clearItems,
}) => {
  const handleClick = (item: SelectItem) => {
    if (selectedItems.includes(item)) {
      removeItem(item.id);
    } else {
      addItem(item.id);
    }
  };

  return (
    <FilterBlock clearFunc={() => clearItems()} title={title} isSelected={!!selectedItems.length}>
      <ul className={styles.brands__list}>
        {items.map((item) => (
          <li
            key={item.id}
            className={classNames(styles.brand, {
              [styles.active]: selectedItems.includes(item),
            })}
            onClick={() => handleClick(item)}>
            <span
              className={classNames(styles.checkbox, {
                [styles.checkbox_checked]: selectedItems.includes(item),
              })}></span>
            {item.title}
          </li>
        ))}
      </ul>
    </FilterBlock>
  );
};

export default SelectFilter;
