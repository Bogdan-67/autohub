import React from 'react';
import styles from './NotFound.module.scss';
import Button from '../../components/common/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

type Props = {
  link?: string;
};

export const NotFound: React.FC<Props> = ({ link }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <span className={styles.notFound__numbers}>404</span>{' '}
      <p className={styles.notFound__text}>Страница не найдена</p>
      <div className={styles.notFound__buttons}>
        {window.history.length > 1 && <Button onClick={() => navigate(-1)}>← &nbsp; Назад</Button>}
        <Link className={styles.notFound__button} to={link ? link : '/'}>
          <Button className={styles.notFound__button_home}>
            <AiOutlineHome className={styles.notFound__button__icon} /> &nbsp; На главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
