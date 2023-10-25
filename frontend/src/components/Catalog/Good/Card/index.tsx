import React, { FC } from 'react';
import styles from './Card.module.scss';
import { IGood } from '../../../../models/IGood';
import { API_URL } from '../../../../http';
import { Link } from 'react-router-dom';

const GoodCard: FC<IGood> = ({ photos, good_name, id_good, price }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        {/* TODO: Сделать слайдер фоток */}
        <img src={`${API_URL}/good-photos/${id_good}/${photos[0]}`} alt={'Photo'} />
      </div>
      <Link to={`/goods/${id_good}`}>
        <h4 className={styles.card__title}>{good_name}</h4>
      </Link>
      {price && <p className={styles.card__price}>{price.toLocaleString('ru-RU')} ₽</p>}
    </div>
  );
};

export default GoodCard;
