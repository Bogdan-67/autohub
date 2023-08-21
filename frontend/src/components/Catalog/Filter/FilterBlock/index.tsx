import React, { FC, useState } from 'react';
import styles from './FilterBlock.module.scss';
import { LiaAngleRightSolid } from 'react-icons/lia';
import classNames from 'classnames';
import { RxCross2 } from 'react-icons/rx';

interface FilterBlockProps {
  title: string;
  clearFunc: () => void;
  children: React.ReactNode;
  isSelected: boolean;
}

const FilterBlock: FC<FilterBlockProps> = ({ children, clearFunc, title, isSelected }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.filterBlock}>
      <div className={styles.filterBlock__header} onClick={() => setIsOpen(!isOpen)}>
        <LiaAngleRightSolid
          className={classNames(styles.filterBlock__header__angle, { [styles.rotated]: isOpen })}
        />
        <h5 className={styles.filterBlock__header__title}>{title}</h5>
        {isSelected && (
          <RxCross2
            className={styles.filterBlock__header__cross}
            onClick={() => clearFunc()}
            title='Очистить'
          />
        )}
      </div>
      {isOpen && <>{children}</>}
    </div>
  );
};

export default FilterBlock;
