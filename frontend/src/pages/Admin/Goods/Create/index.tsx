import React, { useEffect, useId, useRef, useState } from 'react';
import Input from '../../../../components/common/BorderInput';
import styles from './CreateGood.module.scss';
import EditInput from '../../../../components/common/EditInput';
import { IGood } from '../../../../models/IGood';
import BorderButton from '../../../../components/common/Button';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import classNames from 'classnames';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import CategoriesSelectBar from '../../../../components/common/CategoriesSelectBar';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../../../models/validation/CreateGoodSchema';
import GoodService from '../../../../services/GoodService';
import WarnIcon from '../../../../components/common/WarnIcon';
import BrandsSelectBar from '../../../../components/common/BrandsSelectBar';
import FeatureSelect from '../../../../components/common/FeatureSelect';

const CreateGood = (props) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<IGood>>({
    defaultValues: {
      price: 0,
      storage: 0,
      good_name: '',
      article: '',
      description: '',
      category_id: null,
      photos: [],
      features: [],
    },
    resolver: yupResolver(schema),
  });
  const [imageUrls, setImageUrls] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [features, setFeatures] = useState(getValues('features'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(null);

  const addFeature = () => {
    const currentFeatures = getValues('features');

    currentFeatures.push({ title: '', description: '', id_feature: Date.now() });

    setFeatures(currentFeatures);

    setValue('features', currentFeatures);
    addButtonRef.current.blur();
  };

  const removeFeature = (id: number) => {
    const currentFeatures = getValues('features');

    setFeatures((prev) => prev.filter((feature) => feature.id_feature !== id));

    setValue(
      'features',
      currentFeatures.filter((feature) => feature.id_feature !== id),
    );
  };

  const handleImageChange = (files: FileList) => {
    const selectedFiles = Array.from(files);

    if (selectedFiles.length > 0) {
      const imagePromises = selectedFiles.map((file: File) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((imageDataArray) => {
        setImageUrls((prev) => [...prev, ...imageDataArray]);
      });
    }
  };

  const deletePhoto = async (file: File) => {
    const currentPhotos: File[] = getValues('photos') as File[];

    const imageUrl = await URL.createObjectURL(file);

    setImageUrls((prev) => prev.filter((url) => url !== imageUrl));

    setValue(
      'photos',
      currentPhotos.filter((photo: File) => photo !== file),
    );
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const submit: SubmitHandler<Partial<IGood>> = async (data) => {
    setIsLoading(true);
    console.log(data);
    // const formData = new FormData();

    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     const value = data[key];

    //     if (Array.isArray(value)) {
    //       value.forEach((item, index) => {
    //         if (item instanceof File) {
    //           formData.append(`${key}[]`, item);
    //         } else {
    //           formData.append(`${key}[]`, JSON.stringify(item));
    //         }
    //       });
    //     } else if (value instanceof File) {
    //       formData.append(key, value);
    //     } else {
    //       formData.append(key, String(value));
    //     }
    //   }
    // }
    // await GoodService.createGood(formData)
    //   .then((_) => {
    //     reset();
    //     setFeatures([]);
    //     setIsError(null);
    //   })
    //   .catch((e) => setIsError(e.response ? e.response.data.message : 'Ошибка сервера'))
    //   .finally(() => setIsLoading(false));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <h1 className='admin-title'>Создание товара</h1>
      <div className={styles.inputs}>
        <Controller
          name='good_name'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <EditInput title='Название'>
              <Input
                className={classNames('border-input', styles.inputs__input)}
                aria-invalid={errors.good_name ? true : false}
                error={errors.good_name ? errors.good_name.message : ''}
                {...field}
              />
            </EditInput>
          )}
        />
        <Controller
          name='article'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <EditInput title='Артикул'>
              <Input
                className={classNames('border-input', styles.inputs__input)}
                aria-invalid={errors.article ? true : false}
                error={errors.article ? errors.article.message : ''}
                {...field}
              />
            </EditInput>
          )}
        />
        <Controller
          name='price'
          control={control}
          render={({ field }) => (
            <EditInput title='Цена'>
              <Input
                className={classNames('border-input', styles.inputs__input)}
                aria-invalid={errors.price ? true : false}
                error={errors.price ? errors.price.message : ''}
                {...field}
              />
            </EditInput>
          )}
        />
        <Controller
          name='storage'
          control={control}
          render={({ field }) => (
            <EditInput title='Количество на складе'>
              <Input
                className={classNames('border-input', styles.inputs__input)}
                aria-invalid={errors.storage ? true : false}
                error={errors.storage ? errors.storage.message : ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                {...field}
              />
            </EditInput>
          )}
        />
        <Controller
          name='description'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <EditInput title='Описание'>
              <textarea
                className={classNames('border-input', styles.inputs__input)}
                aria-invalid={errors.description ? true : false}
                {...field}
              />
            </EditInput>
          )}
        />

        <Controller
          name='category_id'
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <EditInput title='Категория'>
              <CategoriesSelectBar
                className={classNames(styles.inputs__categories, {
                  [styles.inputs__categories_invalid]: !!errors.category_id,
                })}
                categoryId={field.value}
                setCategoryId={(id) => field.onChange(id)}
              />
            </EditInput>
          )}
        />

        <Controller
          name='brand_id'
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <EditInput title='Бренд'>
              <BrandsSelectBar
                className={classNames(styles.inputs__categories, {
                  [styles.inputs__categories_invalid]: !!errors.brand_id,
                })}
                brandId={field.value}
                setBrandId={(id) => field.onChange(id)}
              />
            </EditInput>
          )}
        />

        <div className={styles.features}>
          <p className={styles.inputs__title}>Характеристики</p>
          {features && features.length > 0 && (
            <ul className={styles.features__list}>
              {features.map((feature, index) => (
                <li key={index} className={styles.features__item}>
                  <Controller
                    name={`features.${index}.title`}
                    control={control}
                    defaultValue={feature.title || ''}
                    render={({ field }) => (
                      <FeatureSelect
                        selectedFeature={field.value}
                        setSelectedFeature={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name={`features.${index}.description`}
                    control={control}
                    defaultValue={feature.description || ''}
                    render={({ field }) => (
                      <Input
                        placeholder='Описание'
                        className={classNames('border-input', styles.features__input)}
                        type='text'
                        value={field.value}
                        onChange={field.onChange}
                        aria-invalid={
                          errors.features &&
                          errors.features[index] &&
                          errors.features[index].description
                            ? true
                            : false
                        }
                      />
                    )}
                  />
                  <BorderButton
                    className='border-btn border-btn_warn'
                    type='button'
                    onClick={() => removeFeature(feature.id_feature)}>
                    Удалить
                  </BorderButton>
                </li>
              ))}
            </ul>
          )}
          <BorderButton
            ref={addButtonRef}
            type='button'
            title='Добавить характеристику'
            className={classNames(styles.features__btn, styles.features__btn_add)}
            onClick={() => addFeature()}>
            <BsPlusLg />
          </BorderButton>
        </div>
        <div className={styles.images}>
          <p className={styles.inputs__title}>
            Изображения
            {errors.photos && (
              <>
                &nbsp; <WarnIcon title={errors.photos.message ? errors.photos.message : 'Ошибка'} />
              </>
            )}
          </p>
          {getValues('photos') && getValues('photos').length > 0 && (
            <div className={styles.images__grid}>
              {getValues('photos').map((file, index) => (
                <div key={index} className={styles.images__block}>
                  <div
                    className={styles.images__img}
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(file)})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}></div>
                  <BorderButton
                    title='Удалить'
                    type='button'
                    onClick={() => deletePhoto(file)}
                    className={classNames('border-btn border-btn_warn', styles.images__cross)}>
                    <BsXLg />
                  </BorderButton>
                </div>
              ))}
            </div>
          )}
          <BorderButton
            className={classNames(styles.features__btn, styles.features__btn_add)}
            title='Добавить изображение'
            type='button'
            onClick={handleAddImageClick}>
            <BsPlusLg />
          </BorderButton>
          <Controller
            name='photos'
            defaultValue={[]}
            control={control}
            render={({ field }) => (
              <>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/png, image/jpeg'
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    field.onChange([...getValues('photos'), ...Array.from(e.target.files)]);
                    handleImageChange(e.target.files);
                  }}
                />
              </>
            )}
          />
        </div>
      </div>
      {isError && <div>{isError}</div>}
      <BorderButton
        loading={isLoading}
        spinnerColor='#404040'
        className={classNames('border-btn border-btn_save', styles.form__saveBtn)}
        type='submit'>
        Создать
      </BorderButton>
    </form>
  );
};

export default CreateGood;
