import { FC, useEffect, useState } from 'react';
import styles from './header.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../../assets/logo.png';
import Modal from '../../common/Modal';
import LoginForm from '../../Auth/LoginForm';
import RegistrForm from '../../Auth/RegistrForm';
import { useAppSelector } from '../../../hooks/redux';
import { SelectIsAuth, SelectUser } from '../../../redux/slices/authSlice';

interface Props {}

const AdminHeader: FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, surname } = useAppSelector(SelectUser);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'>
            <img className={styles.logo__img} src={logo} alt='Dealer-Center' />
          </Link>
        </div>
        <div className={styles.box}>
          <div className={classNames(styles.item, styles.profile, styles.box__item)}>
            <Link to='/admin'>
              {name && surname ? name + ' ' + surname[0].toUpperCase() + '.' : 'Admin'}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
