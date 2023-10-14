import React, { useEffect, useId, useRef, useState } from 'react';
import Input from '../../../../components/common/Input';
import styles from './CreateGood.module.scss';
import EditInput from '../../../../components/common/EditInput';
import { IGood } from '../../../../models/IGood';
import Button from '../../../../components/common/Button';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

type Props = {};

const inputs = {
  good_name: { label: 'Название', type: 'text' },
  article: { label: 'Артикул', type: 'text' },
  price: { label: 'Цена', type: 'text' },
  storage: { label: 'Количество на складе', type: 'number' },
  description: { label: 'Описание', type: 'textarea' },
};

const CreateGood = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Partial<IGood>>();
  const [good, setGood] = useState<Partial<IGood>>({ features: [] });
  const [images, setImages] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(good);
  }, [good]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const addFeature = () => {
    setGood((prev) => ({
      ...prev,
      features: [...prev.features, { title: '', description: '', id_feature: Date.now() }],
    }));
    addButtonRef.current.blur();
  };

  const changeFeature = (key: string, value: string, id: number) => {
    setGood((prev) => ({
      ...prev,
      features: prev.features.map((f) => (f.id_feature === id ? { ...f, [key]: value } : f)),
    }));
  };

  const removeFeature = (id: number) => {
    setGood({ ...good, features: good.features.filter((f) => f.id_feature !== id) });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      const imagePromises = selectedFiles.map((file: File) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((imageDataArray) => {
        setImages((prev) => [...prev, ...imageDataArray]);
      });
    } else {
      setImages([]);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <h1 className='admin-title'>Создание товара</h1>
      <div className={styles.inputs}>
        {Object.entries(inputs).map((prop) => (
          <EditInput
            key={prop[0]}
            title={prop[1].label}
            type={prop[1].type}
            value={good[prop[0]]}
            onChange={(value) => setGood((prev) => ({ ...prev, [prop[0]]: value }))}
          />
        ))}
        <div className={styles.features}>
          <p className={styles.inputs__title}>Характеристики</p>
          {good.features && (
            <ul className={styles.features__list}>
              {good?.features.map((feature) => (
                <li key={feature.id_feature} className={styles.features__item}>
                  <Input
                    placeholder='Название'
                    className={classNames('border-input', styles.features__input)}
                    type='text'
                    value={feature.title}
                    onChange={(e) => changeFeature('title', e.target.value, feature.id_feature)}
                  />
                  <Input
                    placeholder='Описание'
                    className={classNames('border-input', styles.features__input)}
                    type='text'
                    value={feature.description}
                    onChange={(e) =>
                      changeFeature('description', e.target.value, feature.id_feature)
                    }
                  />
                  <Button
                    className='border-btn border-btn_warn'
                    onClick={() => removeFeature(feature.id_feature)}>
                    Удалить
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button
            ref={addButtonRef}
            title='Добавить характеристику'
            className={classNames(styles.features__btn, styles.features__btn_add)}
            onClick={() => addFeature()}>
            <BsPlusLg />
          </Button>
        </div>
        <div className={styles.images}>
          <p className={styles.inputs__title}>Изображения</p>
          <div className={styles.images__grid}>
            {images &&
              images.map((file) => (
                <div className={styles.images__block}>
                  <div
                    className={styles.images__img}
                    style={{
                      backgroundImage: `url(${file})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}></div>
                  <Button
                    title='Удалить'
                    onClick={() => setImages((prev) => prev.filter((img) => img !== file))}
                    className={classNames('border-btn border-btn_warn', styles.images__cross)}>
                    <BsXLg />
                  </Button>
                </div>
              ))}
          </div>
          <Button
            className={classNames(styles.features__btn, styles.features__btn_add)}
            onClick={handleAddImageClick}>
            <BsPlusLg />
          </Button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/png, image/jpeg'
            style={{ display: 'none' }}
            multiple={true}
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      </div>
      <Button className='border-btn border-btn_save'>Создать</Button>
    </>
  );
};

export default CreateGood;
