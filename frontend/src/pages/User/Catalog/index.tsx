import React, { useState } from 'react';
import styles from './Catalog.module.scss';
import Filter from '../../../components/Catalog/Filter';
import TopSidebar from '../../../components/Catalog/TopSidebar';
import { useAppSelector } from '../../../hooks/redux';
import { SelectView } from '../../../redux/slices/filterSlice';
import GoodCard from '../../../components/Catalog/Good/Card';
import GoodRow from '../../../components/Catalog/Good/Row';
import sub from '../../../assets/sub.png';
import Pagination from '../../../components/Catalog/Pagination';

export const Catalog: React.FC = () => {
  const view = useAppSelector(SelectView);
  const [page, setPage] = useState<number>(1);

  const goods = [...Array(12)].map((_, index) => {
    return {
      img: sub,
      title: 'A10 Wide',
      price: Math.floor(Math.random() * 100) * 1000,
    };
  });

  return (
    <section className={styles.wrapper}>
      <Filter />
      <div className={styles.wrapper__content}>
        <TopSidebar />
        <div className={styles.wrapper__content__goods}>
          {goods.map((good, index) => {
            if (view === 'cards') {
              return <GoodCard key={index} {...good} />;
            } else {
              return <GoodRow key={index} />;
            }
          })}
        </div>
        <Pagination page={page} pageCount={7} handlePageClick={setPage} />
      </div>
    </section>
  );
};
export default Catalog;