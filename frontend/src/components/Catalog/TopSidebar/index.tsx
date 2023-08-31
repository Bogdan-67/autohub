import React from 'react';
import Sort from '../Sort';
import styles from './TopSidebar.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import { SelectView, setView } from '../../../redux/slices/filterSlice';
import { useAppDispatch } from '../../../redux/store';
import classNames from 'classnames';

const TopSidebar = () => {
  const view = useAppSelector(SelectView);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.content}>
      <Sort />
      <div className={styles.content__right}>
        <div className={styles.cards} onClick={() => dispatch(setView('cards'))}>
          {[...new Array(4)].map((_, index) => (
            <span key={index} className={classNames({ [styles.active]: view === 'cards' })}></span>
          ))}
        </div>
        <div className={styles.rows} onClick={() => dispatch(setView('rows'))}>
          {[...new Array(2)].map((_, index) => (
            <span key={index} className={classNames({ [styles.active]: view === 'rows' })}></span>
          ))}
        </div>
        <div className={styles.compare}>
          Сравнение: <span className={styles.compare__count}>2</span>
        </div>
      </div>
    </div>
  );
};

export default TopSidebar;
