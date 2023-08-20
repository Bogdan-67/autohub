import React, { useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import styles from './BrandsFilter.module.scss';
import { LiaAngleRightSolid } from 'react-icons/lia';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { SelectBrands, clearBrands } from '../../../../redux/slices/filterSlice';
import { RxCross2 } from 'react-icons/rx';

const BrandsFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedBrands = useSelector(SelectBrands);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.brands}>
      <div className={styles.brands__header} onClick={() => setIsOpen(!isOpen)}>
        <LiaAngleRightSolid
          className={classNames(styles.brands__header__angle, { [styles.rotated]: isOpen })}
        />
        <h5 className={styles.brands__header__title}>Брэнды</h5>
        {selectedBrands && (
          <RxCross2
            className={styles.brands__header__cross}
            onClick={() => dispatch(clearBrands())}
          />
        )}
      </div>
      {isOpen && <ul className={styles.brands__list}></ul>}
    </div>
  );
};

export default BrandsFilter;
import React, { useState } from 'react';
import { useAppDispatch } from '../../../../redux/store';
import styles from './BrandsFilter.module.scss';
import { LiaAngleRightSolid } from 'react-icons/lia';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { SelectBrands, clearBrands } from '../../../../redux/slices/filterSlice';
import { RxCross2 } from 'react-icons/rx';
import brands from '../../../Main/BrandsSlider/brands.json';

const BrandsFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedBrands = useSelector(SelectBrands);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.brands}>
      <div className={styles.brands__header} onClick={() => setIsOpen(!isOpen)}>
        <LiaAngleRightSolid
          className={classNames(styles.brands__header__angle, { [styles.rotated]: isOpen })}
        />
        <h5 className={styles.brands__header__title}>Брэнды</h5>
        {selectedBrands && (
          <RxCross2
            className={styles.brands__header__cross}
            onClick={() => dispatch(clearBrands())}
          />
        )}
      </div>
      {isOpen && (
        <ul className={styles.brands__list}>
          {brands.map((brand) => (
            <li>{brand.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandsFilter;
