import React from 'react';
import styles from './News.module.scss';
import { Link } from 'react-router-dom';
import news from './news.json';

const News = () => {
  return (
    <section className={styles.news}>
      <h2 className={styles.news__title}>Последние новости</h2>
      <div className={styles.news__linkMore}>
        <Link to='/news'>Посмотреть все</Link>
      </div>
      <div className={styles.news__content}>
        {news.map((article) => (
          <div
            className={styles.news__article}
            style={{
              background: `url("${article.img}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}>
            <div className={styles.news__article__overlay}>
              <span className={styles.news__article__date}>{article.date}</span>
              <h4 className={styles.news__article__title}>{article.title}</h4>
              <p className={styles.news__article__text}>{article.text}</p>
              <p className={styles.news__article__endword}>Приятного просмотра!</p>
              <Link to='/news' className={styles.news__article__button}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
