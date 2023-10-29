import React from 'react';
import styles from './Map.module.scss';
import { Link } from 'react-router-dom';

type Props = {};

const Map = (props: Props) => {
  return (
    <section className={styles.map}>
      <h2 className={styles.map__title}>
        Мы{' '}
        <Link to={'https://yandex.ru/maps/-/CDaLj-2n'}>
          <span>здесь</span>
        </Link>
      </h2>
      <iframe
        src='https://yandex.ru/map-widget/v1/?um=constructor%3Ae161cd993b0658583e22abbc725c7f7f2e8776e68412577e8305ad81d939c620&amp;source=constructor'
        width='100%'
        height='400'
        frameBorder='0'></iframe>
    </section>
  );
};

export default Map;
