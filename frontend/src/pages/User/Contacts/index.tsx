import React from 'react';
import styles from './Contacts.module.scss';
import { Link } from 'react-router-dom';
import FeedbackForm from '../../../components/Forms/Feedback';

type Props = {};

const contacts = [
  {
    title: 'Телефоны',
    items: [
      {
        text: '+7 495 846 48 29',
        link: 'tel:+74958464829',
      },
      {
        text: '8 800 333 93 29',
        link: 'tel:88003339329',
      },
    ],
  },
  {
    title: 'Почты',
    items: [
      {
        text: 'info@autohub.ru',
        link: 'mailto:info@autohub.ru',
      },
    ],
  },
  {
    title: 'Адреса',
    items: [
      {
        text: '124498, г. Москва, г. Зеленоград, Савёлкинский проезд, 4к1',
        link: 'https://yandex.ru/maps/-/CDaLj-2n',
      },
    ],
  },
];

const Contacts = (props: Props) => {
  return (
    <section className={styles.contacts}>
      <h1 className={styles.contacts__title}>Наши контакты</h1>
      <div className={styles.container}>
        <ul className={styles.contacts__blocks}>
          {contacts.map((type) => (
            <li className={styles.block}>
              <h3 className={styles.block__title}>{type.title}</h3>
              <ul className={styles.block__list}>
                {type.items.map((contact) => (
                  <li className={styles.block__list__item}>
                    <Link to={contact.link}>{contact.text}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className={styles.contacts__feedback}>
          <FeedbackForm />
        </div>
      </div>
      <iframe
        src='https://yandex.ru/map-widget/v1/?um=constructor%3Ae161cd993b0658583e22abbc725c7f7f2e8776e68412577e8305ad81d939c620&amp;source=constructor'
        width='100%'
        height='400'
        frameBorder='0'></iframe>
    </section>
  );
};

export default Contacts;
