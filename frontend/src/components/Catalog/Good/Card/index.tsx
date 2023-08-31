import React from 'react';
import styles from './Card.module.scss';

const GoodCard = ({ img, title, price }) => {
  return (
    <div className={styles.card}>
      <img className={styles.card__img} src={img} alt={''} />
      <h4 className={styles.card__title}>{title}</h4>
      <p className={styles.card__price}>{price} ₽</p>
    </div>
  );
};

export default GoodCard;
