import React, { useRef, useState } from 'react';
import Button from '../../common/Button';
import classNames from 'classnames';
import Modal from '../../common/Modal';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IBrand } from '../../../models/IBrand';

import schema from '../../../models/validation/CreateBrandSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import BorderInput from '../../common/BorderInput';
import styles from './CreateBrandModal.module.scss';
import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';
import BrandService from '../../../services/BrandService';

type Props = {};

const CreateBrandModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>();
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<IBrand>>({
    defaultValues: {
      name: '',
      description: '',
      logo: null,
    },
    resolver: yupResolver(schema),
  });

  const handleImageChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit: SubmitHandler<Partial<IBrand>> = async (data) => {
    console.log(data);
    setIsLoading(true);
    setIsError(null);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('logo', data.logo);
    formData.append('description', data.description);
    await BrandService.createBrand(formData)
      .then((_) => {
        reset();
        setIsOpen(false);
        setImageUrl(null);
      })
      .catch((e) => {
        setIsError(e.response?.data.message ? e.response.data.message : 'Произошла ошибка');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Button className={classNames('border-btn')} onClick={() => setIsOpen(true)}>
        Создать
      </Button>
      <Modal isActive={isOpen} setIsActive={setIsOpen}>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <h2 className={styles.form__title}>Создание бренда</h2>
          <label className={styles.form__label} htmlFor={'name'}>
            Название
          </label>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <BorderInput
                boxClassName={styles.form__input}
                id={'name'}
                {...field}
                aria-invalid={errors.name ? true : false}
                error={errors.name && errors.name.message}
              />
            )}
          />
          <label className={styles.form__label} htmlFor={'description'}>
            Описание
          </label>
          <Controller
            name='description'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <textarea
                id='description'
                className={classNames('border-input', styles.form__input)}
                {...field}
              />
            )}
          />
          <label className={styles.form__label} htmlFor={'logo'}>
            Изображение{' '}
            {imageUrl && (
              <Button
                className={styles.form__img__remove}
                title='Удалить фото'
                onClick={() => {
                  setValue('logo', null);
                  setImageUrl(null);
                  fileInputRef.current.value = '';
                }}>
                <AiOutlineMinus />
              </Button>
            )}
          </label>
          <Controller
            name='logo'
            control={control}
            render={({ field }) => (
              <input
                ref={fileInputRef}
                accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                type='file'
                id='logo'
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                  handleImageChange(e.target.files[0]);
                }}
              />
            )}
          />
          {imageUrl ? (
            <img className={styles.form__img} src={imageUrl} alt='Preview image' />
          ) : (
            <Button
              className={classNames(styles.form__addBtn)}
              title='Добавить изображение'
              type='button'
              onClick={() => fileInputRef.current.click()}>
              <BsPlusLg />
            </Button>
          )}
          {isError && <div className={styles.form__error}>{isError}</div>}
          <Button
            type='submit'
            loading={isLoading}
            spinnerColor='#fff'
            className={classNames('border-btn', styles.form__submit)}>
            Подтвердить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateBrandModal;
