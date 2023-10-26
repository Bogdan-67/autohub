import { Avatar, Rate } from 'antd';
import React from 'react';
import styles from './Review.module.scss';

type Props = {
  name: string;
  surname: string;
  rate: number;
  car?: string;
};

const ReviewTitle = ({ name, surname, rate, car }: Props) => {
  return (
    <div className={styles.review__title}>
      <Avatar style={{ backgroundColor: '#f56a00', color: '#fff' }}>{name[0]}</Avatar>
      <p>
        {name} {surname[0]}.
      </p>
      <Rate defaultValue={rate} disabled />
      {car && <span className={styles.review__car}>{car}</span>}
    </div>
  );
};

export default ReviewTitle;
