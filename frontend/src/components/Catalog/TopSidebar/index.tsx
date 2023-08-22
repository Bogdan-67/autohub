import React from 'react';
import Sort from '../Sort';
import styles from './TopSidebar.module.scss';

const TopSidebar = () => {
  return (
    <div className={styles.content}>
      <Sort />
    </div>
  );
};

export default TopSidebar;
