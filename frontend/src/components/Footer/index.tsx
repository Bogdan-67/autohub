import { FC } from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const footerNav = [
  {
    title: 'Компания',
    items: [
      {
        text: 'Каталог',
        link: '/catalog',
      },
      {
        text: 'Проекты',
        link: '/projects',
      },
      {
        text: 'Бренды',
        link: '/brands',
      },
      {
        text: 'О нас',
        link: '/about',
      },
      {
        text: 'Связаться с нами',
        link: '/contacts',
      },
    ],
  },
  {
    title: 'Информация',
    items: [
      {
        text: 'Доставка',
        link: '/shipping',
      },
      {
        text: 'Сервис',
        link: '/service',
      },
    ],
  },
  {
    title: 'Контакты',
    items: [
      {
        text: '+7 495 981 48 29',
        link: 'tel:+74959814829',
      },
      {
        text: '8 800 333 68 29',
        link: 'tel:88003336829',
      },
      {
        text: 'Звонок по РФ бесплатный',
        link: '',
      },
      {
        text: 'info@dealer-center.ru',
        link: 'mailto:info@dealer-center.ru',
      },
      {
        text: '125364, г. Москва, ул. Свободы, 50/3',
        link: 'https://yandex.ru/maps/-/CDQIV4Zu',
      },
    ],
  },
];

const Footer: FC = () => {
  return (
    <footer id='footer' className={styles.footer}>
      <div className={styles.footer__separator}></div>
      <div className={styles.footer__content}>
        <div>
          <Link to='/' className={styles.footer__logo}>
            <img src={logo} alt='Dealer-Center' />
          </Link>
          <div className={styles.footer__date}>© 2010 - {new Date().getFullYear()}</div>
        </div>
        {footerNav.map((navblock) => (
          <div className={styles.footer__navblock}>
            <h5 className={styles.footer__navblock__title}>{navblock.title}</h5>
            {navblock.items.map((item) => (
              <Link to={item.link} className={styles.footer__navblock__link}>
                {item.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
