import React, { useState } from 'react';
import styles from './Feedback.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFeedback } from '../../../models/IFeedback';
import Button from '../../common/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import FeedbackSchema from '../../../models/validation/FeedbackSchema';
import { Input, message } from 'antd';
import { useAppSelector } from '../../../hooks/redux';
import { SelectUserID } from '../../../redux/slices/authSlice';
import FeedbackService from '../../../services/FeedbackService';

type Props = {};

const FeedbackForm = (props: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Partial<IFeedback>>({
    resolver: yupResolver(FeedbackSchema),
  });
  const user_id = useAppSelector(SelectUserID);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit: SubmitHandler<Partial<IFeedback>> = async (data) => {
    console.log({ ...data, user_id });
    setIsLoading(true);
    await FeedbackService.createFeedback(data.message, data.contacts, user_id)
      .then((response) => {
        message.success('Сообщение отправлено');
        reset();
      })
      .catch((e) =>
        message.error(e.response && e.response.data.message ? e.response.data.message : e.message),
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <h2 className={styles.form__title}>Связаться с нами</h2>
      <div className={styles.form__box}>
        <div className={styles.form__box__item}>
          <Controller
            name='message'
            control={control}
            render={({ field }) => (
              <label>
                <p className={styles.form__label}>Ваше сообщение:</p>
                <Input.TextArea className={styles.form__message} {...field} />
              </label>
            )}
          />
        </div>
        <div className={styles.form__box__item}>
          <Controller
            name='contacts'
            control={control}
            render={({ field }) => (
              <label>
                <p className={styles.form__label}>Ваши контакты:</p>
                <Input.TextArea {...field} />
              </label>
            )}
          />
          <Button
            className={styles.form__btn}
            loading={isLoading}
            disabled={!!(!isDirty || errors.message || errors.contacts)}
            type='submit'>
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
