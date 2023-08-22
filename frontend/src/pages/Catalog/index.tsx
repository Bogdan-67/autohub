import React from 'react';
import styles from './Catalog.module.scss';
import Filter from '../../components/Catalog/Filter';
import TopSidebar from '../../components/Catalog/TopSidebar';

export const Catalog: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Filter />
      <div className={styles.wrapper__content}>
        <TopSidebar />
      </div>
    </section>
  );
};
export default Catalog;
