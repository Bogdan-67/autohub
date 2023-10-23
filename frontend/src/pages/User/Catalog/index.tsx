import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import Filter from '../../../components/Catalog/Filter';
import TopSidebar from '../../../components/Catalog/TopSidebar';
import { useAppSelector } from '../../../hooks/redux';
import { SelectView } from '../../../redux/slices/filterSlice';
import GoodCard from '../../../components/Catalog/Good/Card';
import GoodRow from '../../../components/Catalog/Good/Row';
import Pagination from '../../../components/Catalog/Pagination';
import { SelectGoodSlice } from '../../../redux/slices/goodSlice';
import { Status } from '../../../models/Status.enum';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { Result } from 'antd';

export const Catalog: React.FC = () => {
  const view = useAppSelector(SelectView);
  const [page, setPage] = useState<number>(1);
  const { status, goods, error } = useAppSelector(SelectGoodSlice);

  return (
    <section className={styles.wrapper}>
      <Filter />
      <div className={styles.wrapper__content}>
        <TopSidebar />
        <div className={styles.wrapper__content__goods}>
          {status === Status.LOADING ? (
            <div className={styles.wrapper__content__goods_loading}>
              <LoadingSpinner size={30} color='#e8e8e8'></LoadingSpinner>
            </div>
          ) : status === Status.ERROR ? (
            <div className={styles.wrapper__content__goods_loading}>
              <Result
                status='500'
                title='Ошибка 500: Не удалось получить товары :('
                subTitle={error}></Result>
            </div>
          ) : goods.length === 0 ? (
            <div className={styles.wrapper__content__goods_loading}>Товары не найдены</div>
          ) : (
            <div className={styles.wrapper__content__goods__grid}>
              {goods.map((good, index) => {
                if (view === 'cards') {
                  return <GoodCard key={index} {...good} />;
                } else {
                  return <GoodRow key={index} {...good} />;
                }
              })}
            </div>
          )}
        </div>
        <Pagination page={page} pageCount={7} handlePageClick={setPage} />
      </div>
    </section>
  );
};
export default Catalog;
