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

const menuItems = [
  // TODO:  Сделать страницу с услугами, новостями, брендами
  { id: 3, title: 'Услуги', path: '/services' },
  { id: 4, title: 'Новости', path: '/news' },
  { id: 1, title: 'Проекты', path: '/projects' },
  { id: 2, title: 'О нас', path: '/about' },
  { id: 5, title: 'Контакты', path: '/contacts' },
];

interface Props {}

const MainHeader: FC<Props> = ({}) => {
  const location = useLocation();
  const item = 3;
  const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const isAuth = useAppSelector(SelectIsAuth);
  const { name, surname } = useAppSelector(SelectUser);

  useEffect(() => {
    if (isAuth) {
      setIsOpenAuth(false);
    }
    console.log('isAuth', isAuth);
  }, [isAuth]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'>
            <img className={styles.logo__img} src={logo} alt='AutoHub' />
          </Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to='/catalog'
              className={classNames(
                styles.item,
                location.pathname === '/catalog' ? styles.active : '',
              )}>
              Автозапчасти
            </NavLink>
          </li>
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={classNames(
                  styles.item,
                  location.pathname === item.path ? styles.active : '',
                )}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.box}>
          {/* <div className={classNames(styles.search, styles.item, styles.box__item)}>Поиск</div> */}
          {!isAuth ? (
            <div className={classNames(styles.login, styles.item, styles.box__item)}>
              <a onClick={() => setIsOpenAuth(true)}>Войти</a>
            </div>
          ) : (
            <div className={classNames(styles.item, styles.profile, styles.box__item)}>
              <Link className={location.pathname === '/profile' ? styles.active : ''} to='/profile'>
                {name && surname ? name + ' ' + surname[0].toUpperCase() + '.' : 'Профиль'}
              </Link>
            </div>
          )}
          <div className={classNames(styles.cart, styles.item, styles.box__item)}>
            <div>
              <Link className={location.pathname === '/cart' ? styles.active : ''} to='/cart'>
                Корзина
              </Link>
            </div>

            <div className={styles.alert}>{item}</div>
          </div>
        </div>
      </header>
      <Modal isActive={isOpenAuth} setIsActive={setIsOpenAuth}>
        <div className={styles.auth}>
          {hasAccount ? (
            <>
              <LoginForm />
              <p className={styles.auth__text}>
                Нет аккаунта?&nbsp;
                <a onClick={() => setHasAccount(false)} className={styles.auth__link}>
                  Зарегистрироваться
                </a>
              </p>
            </>
          ) : (
            <>
              <RegistrForm />

              <p className={styles.auth__text}>
                Уже есть аккаунт?&nbsp;
                <a onClick={() => setHasAccount(true)} className={styles.auth__link}>
                  Войти
                </a>
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MainHeader;
