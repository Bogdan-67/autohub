import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import GoodService from '../../../services/GoodService';
import { IGood } from '../../../models/IGood';
import styles from './GoodPage.module.scss';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { Tabs, Result, Image, Descriptions } from 'antd';
import { API_URL } from '../../../http';
import Slider from 'react-slick';
import '../../../scss/goodPhotosSlider.scss';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import type { TabsProps } from 'antd';
import Button from '../../../components/common/Button';

type Props = {};

const GoodPage = (props: Props) => {
  const { id } = useParams();
  const [good, setGood] = useState<IGood>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);
  const [sliderRef, setSliderRef] = useState(null);
  const [showArrows, setShowArrows] = useState<boolean>(false);
  const [tabs, setTabs] = useState<TabsProps['items']>([]);

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    dotsClass: 'goodDots',
  };

  const fetchGood = async () => {
    setIsLoading(true);
    setError(null);
    await GoodService.getGoodById(Number(id))
      .then((response) => {
        setGood(response.data);
        console.log(response.data);

        const featuresOptions = response.data.features.map((feature, index) => ({
          key: index,
          label: feature.title,
          children: <p>{feature.description}</p>,
        }));

        setTabs([
          {
            key: '1',
            label: 'Описание',
            children: <p>{response.data.description}</p>,
          },
          {
            key: '2',
            label: 'Характеристики',
            children: <Descriptions bordered items={featuresOptions} />,
          },
          {
            key: '3',
            label: 'Отзывы',
            children: 'Отзывы',
          },
        ]);
      })
      .catch((e) => {
        setError(e.response ? e.response.data.message : e.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchGood();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner size={40} color='#e8e8e8' />
      ) : error ? (
        <>
          <Result
            status='500'
            title='Ошибка 500: Не удалось получить товар :('
            subTitle={error}></Result>
        </>
      ) : (
        <div className={styles.good}>
          <div className={styles.good__preview}>
            <div
              className={styles.good__photos}
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => setShowArrows(false)}>
              {showArrows && (
                <>
                  <button className={styles.slickPrev} onClick={sliderRef?.slickPrev}>
                    <LiaAngleLeftSolid />
                  </button>
                  <button className={styles.slickNext} onClick={sliderRef?.slickNext}>
                    <LiaAngleRightSolid />
                  </button>
                </>
              )}
              {good && good.photos && good.photos.length > 0 ? (
                <Slider className={styles.good__slider} ref={setSliderRef} {...sliderSettings}>
                  {good.photos.map((url) => (
                    <div className={styles.good__slider__item}>
                      <Image
                        className={styles.good__image}
                        height={400}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                        src={API_URL + '/good-photos/' + id + '/' + url}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div>
                  <Image
                    width={200}
                    height={200}
                    src='error'
                    fallback='data:image/png;base64,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'
                  />
                </div>
              )}
            </div>
            <div className={styles.good__announce}>
              <h2 className={styles.good__announce__brand}>{good.brand_name}</h2>
              <h1 className={styles.good__announce__title}>{good.good_name}</h1>
              <span className={styles.good__announce__article}>Арт. {good.article}</span>
              {good.price && (
                <>
                  <p className={styles.good__announce__price}>
                    {good.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <Button className={styles.good__announce__cartBtn}>Добавить в корзину</Button>
                </>
              )}
            </div>
          </div>
          <div className={styles.good__info}>
            {tabs.length > 0 && <Tabs defaultActiveKey='1' items={tabs} />}
          </div>
        </div>
      )}
    </>
  );
};

export default GoodPage;
