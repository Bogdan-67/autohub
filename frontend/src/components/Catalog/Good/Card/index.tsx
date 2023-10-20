import React, { FC } from 'react';
import styles from './Card.module.scss';
import { IGood } from '../../../../models/IGood';
import { API_URL } from '../../../../http';

const GoodCard: FC<IGood> = ({ photos, good_name, id_good, price }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.card__img}
        src={`${API_URL}/good-photos/${id_good}/${photos[0]}`}
        alt={'Photo'}
      />
      <h4 className={styles.card__good_name}>{good_name}</h4>
      <p className={styles.card__price}>{price} ₽</p>
    </div>
  );
};

export default GoodCard;
