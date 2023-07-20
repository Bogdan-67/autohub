import { FC, useState } from 'react';
import styles from './header.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../assets/logo.png';

const menuItems = [
  { id: 1, title: 'Проекты', path: '/projects' },
  { id: 2, title: 'О нас', path: '/about' },
  { id: 3, title: 'Где купить', path: '/shops' },
  { id: 4, title: 'Бренды', path: '/brands' },
  { id: 5, title: 'Контакты', path: '/contacts' },
];
const Header = (login) => {
  const location = useLocation();
  const item = 3;
  const [isOpen, setIsOpen] = useState(false);
  console.log('login', login.login);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to='/'>
          <img src={logo} alt='Dealer-Center' />
        </Link>
      </div>
      <ul className={styles.menu}>
        <li>
          <NavLink
            to='/catalog'
            className={classNames(
              styles.item,
              location.pathname == '/catalog' ? styles.active : '',
            )}>
            Каталог
          </NavLink>
          <button className={styles.menu__button} onClick={toggleMenu}>
            ;D
          </button>
          <ul className={classNames(styles.menu_items, isOpen ? styles.open : '')}>
            <li>Звуковое обородувание</li>
            <li>Микрофоны</li>
            <li>Свет</li>
          </ul>
        </li>
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={classNames(
                styles.item,
                location.pathname == item.path ? styles.active : '',
              )}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.box}>
        <div className={classNames(styles.search, styles.box__item)}>Поиск</div>
        {login.login ? (
          <div className={classNames(styles.login, styles.box__item)}>
            <Link to='/login'>Войти</Link>
          </div>
        ) : (
          <div className={classNames(styles.item, styles.profile, styles.box__item)}>
            <Link className={location.pathname == '/profile' ? styles.active : ''} to='/profile'>
              Профиль
            </Link>
          </div>
        )}
        <div className={classNames(styles.cart, styles.box__item)}>
          <div className={styles.item}>
            <Link className={location.pathname == '/cart' ? styles.active : ''} to='/cart'>
              Корзина
            </Link>
          </div>

          <div className={styles.alert}>{item}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
