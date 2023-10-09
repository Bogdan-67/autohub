import React from 'react';
import styles from './NotFound.module.scss';
import Button from '../../components/common/Button';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  link?: string;
};

export const NotFound: React.FC<Props> = ({ link }) => {
  return (
    <div className={styles.notFound}>
      <span className={styles.notFound__numbers}>404</span>{' '}
      <p className={styles.notFound__text}>Страница не найдена</p>
      <Link className={styles.notFound__button} to={link ? link : '/'}>
        <Button>← &nbsp; На главную</Button>
      </Link>
    </div>
  );
};

export default NotFound;
