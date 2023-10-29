import { FC } from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const footerNav = [
  {
    title: 'Компания',
    items: [
      {
        text: 'Автозапчасти',
        link: '/catalog',
      },
      {
        text: 'Проекты',
        link: '/projects',
      },
      {
        text: 'Новости',
        link: '/news',
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
        text: 'Услуги',
        link: '/services',
      },
    ],
  },
  {
    title: 'Контакты',
    items: [
      {
        text: '+7 495 846 48 29',
        link: 'tel:+74958464829',
      },
      {
        text: '8 800 333 93 29',
        link: 'tel:88003339329',
      },
      {
        text: 'Звонок по РФ бесплатный',
        link: '',
      },
      {
        text: 'info@autohub.ru',
        link: 'mailto:info@autohub.ru',
      },
      {
        text: '124498, г. Москва, г. Зеленоград, Савёлкинский проезд, 4к1',
        link: 'https://yandex.ru/maps/-/CDaLj-2n',
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
            <img className={styles.footer__logo__img} src={logo} alt='Dealer-Center' />
          </Link>
          <div className={styles.footer__date}>© 2010 - {new Date().getFullYear()}</div>
        </div>
        {footerNav.map((navblock, index) => (
          <div key={index} className={styles.footer__navblock}>
            <h5 className={styles.footer__navblock__title}>{navblock.title}</h5>
            {navblock.items.map((item, index) => (
              <Link key={index} to={item.link} className={styles.footer__navblock__link}>
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
