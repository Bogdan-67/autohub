import { FC } from 'react';
import { ProfileLayoutProps } from './ProfileLayout.props';
import ProfileCard from '../../../../components/common/ProfileCard';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProfileLayout.module.scss';
import classNames from 'classnames';

const navItems = [
  {
    title: 'Профиль пользователя',
    link: '/profile',
  },
  {
    title: 'Заказы',
    link: '/orders',
  },
];

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className={styles.wrapper}>
      <ProfileCard
        style={{
          minWidth: '30vw',
          maxWidth: '30vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <h1 className={styles.sidebar__title}>Личный кабинет</h1>
        <ul className={styles.sidebar__menu}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              className={classNames(styles.sidebar__item, {
                [styles.active]: item.link === pathname,
              })}
              to={item.link}>
              {item.title}
            </Link>
          ))}
        </ul>
      </ProfileCard>
      <div className={styles.wrapper__content}>{children}</div>
    </div>
  );
};

export default ProfileLayout;
