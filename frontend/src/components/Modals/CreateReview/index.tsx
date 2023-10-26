import React, { useState } from 'react';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IReview } from '../../../models/IReview';
import { Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import styles from './CreateReview.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateReviewSchema from '../../../models/validation/CreateReviewSchema';
import ReviewService from '../../../services/ReviewService';
import { useAppSelector } from '../../../hooks/redux';
import { SelectUser, SelectUserID } from '../../../redux/slices/authSlice';
import { useAppDispatch } from '../../../redux/store';
import { SelectReviews, createReview } from '../../../redux/slices/reviewSlice';
import { Status } from '../../../models/Status.enum';

type Props = {
  good_id: number;
  name: string;
};

const CreateReviewModal = ({ good_id, name }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user_id = useAppSelector(SelectUserID);
  const { status } = useAppSelector(SelectReviews);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<IReview>>({
    resolver: yupResolver(CreateReviewSchema),
  });

  const submit: SubmitHandler<IReview> = async (data) => {
    console.log(data);
    dispatch(
      createReview({
        good_id,
        user_id,
        text: data.text,
        rate: data.rate,
      }),
    );
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className='border-btn'>
        Оставить отзыв
      </Button>
      <Modal isActive={isOpen} setIsActive={setIsOpen}>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <h2 className={styles.form__title}>Новый отзыв о товаре {name}</h2>
          <Controller
            name='rate'
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <label className={styles.form__label}>
                <p className={styles.form__label__title}>Оценка</p>
                <Rate value={field.value} onChange={field.onChange} />
                {errors.rate && <p className={styles.form__error}>{errors.rate.message}</p>}
              </label>
            )}
          />
          <Controller
            name='text'
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <label className={styles.form__label}>
                <p className={styles.form__label__title}>Комментарий</p>
                <TextArea
                  status={errors.text ? 'error' : ''}
                  rows={6}
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.text && <p className={styles.form__error}>{errors.text.message}</p>}
              </label>
            )}
          />
          <Button loading={status === Status.LOADING} className={styles.form__btn} type='submit'>
            Оставить отзыв
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateReviewModal;
