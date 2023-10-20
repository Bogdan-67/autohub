import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import Filter from '../../../components/Catalog/Filter';
import TopSidebar from '../../../components/Catalog/TopSidebar';
import { useAppSelector } from '../../../hooks/redux';
import { SelectFilters, SelectView } from '../../../redux/slices/filterSlice';
import GoodCard from '../../../components/Catalog/Good/Card';
import GoodRow from '../../../components/Catalog/Good/Row';
import sub from '../../../assets/sub.png';
import Pagination from '../../../components/Catalog/Pagination';
import GoodService from '../../../services/GoodService';
import { IGood } from '../../../models/IGood';

export const Catalog: React.FC = () => {
  const view = useAppSelector(SelectView);
  const [page, setPage] = useState<number>(1);
  const { features, category } = useAppSelector(SelectFilters);
  const [goods, setGoods] = useState<IGood[]>([]);

  const fetchGoods = async () => {
    await GoodService.getGoods(category).then((response) => {
      setGoods(response.data);
    });
  };

  useEffect(() => {
    fetchGoods();
  }, [category]);

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
              return <GoodRow key={index} {...good} />;
            }
          })}
        </div>
        <Pagination page={page} pageCount={7} handlePageClick={setPage} />
      </div>
    </section>
  );
};
export default Catalog;
