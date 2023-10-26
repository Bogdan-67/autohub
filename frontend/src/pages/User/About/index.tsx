import React from 'react';
import styles from './About.module.scss';
import classNames from 'classnames';

const advantages: { title: string; description: string }[] = [
  {
    title: 'Опыт и Профессионализм',
    description:
      'Наша команда состоит из опытных механиков и технических специалистов, готовых решать самые сложные проблемы вашего автомобиля',
  },
  {
    title: 'Современное Оборудование',
    description:
      'Мы оборудованы передовой техникой и инструментами, чтобы обеспечить эффективный и точный ремонт',
  },
  {
    title: 'Клиентоориентированный Подход',
    description:
      'Мы всегда слушаем ваши потребности и стремимся предоставить решения, которые соответствуют вашим ожиданиям',
  },
  {
    title: 'Прозрачность и Честность',
    description:
      'Мы гордимся прозрачностью в наших ценах и процессе обслуживания. Вы всегда будете в курсе того, что происходит с вашим автомобилем',
  },
  {
    title: 'Удобство',
    description:
      'У нас есть комфортное ожидание, где вы можете расслабиться, пока мы заботимся о вашем автомобиле.',
  },
  {
    title: 'Широкий спектр услуг',
    description:
      'Мы предлагаем разнообразные услуги, включая обслуживание двигателя, трансмиссии, ремонт тормозов, а также шиномонтаж и балансировку.',
  },
];

export const About: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.about}>
        <h1 className={classNames(styles.about__title, styles.about__title_main)}>
          Добро пожаловать в Auto.Hub!
        </h1>
        <p className={styles.about__text}>
          Auto.Hub - это современный автосервис, предоставляющий высококачественное обслуживание и
          ремонт автомобилей в Зеленограде. Наша миссия - обеспечить вам максимальный комфорт и
          безопасность на дорогах, обеспечив надежное и надежное обслуживание вашего автомобиля.{' '}
        </p>
        <p className={styles.about__title}>Что нас выделяет:</p>
        <ul className={styles.advantages}>
          {advantages.map((adv, index) => (
            <li className={styles.advantages__item}>
              <p className={styles.advantages__item__title}>{adv.title}:</p>
              <p className={styles.advantages__item__desc}>{adv.description}</p>
            </li>
          ))}
        </ul>
        <p className={styles.about__text} style={{ marginTop: '30px' }}>
          Мы стремимся стать вашим надежным партнером в уходе за вашим автомобилем. Посетите
          Auto.Hub уже сегодня и убедитесь, что ваш автомобиль находится в надежных руках.
        </p>
      </div>
    </section>
  );
};
export default About;
