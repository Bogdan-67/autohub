import React from 'react';
import { useAppDispatch } from '../../../../redux/store';
import { useAppSelector } from '../../../../hooks/redux';
import { SelectAuthStatus, SelectUser, logoutAccount } from '../../../../redux/slices/authSlice';
import { Status } from '../../../../models/Status';
import Button from '../../../../components/common/Button';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import ProfileCard from '../../../../components/common/ProfileCard';
import styles from './EditProfile.module.scss';
import classNames from 'classnames';

const labels = {
  name: { label: 'Имя', type: 'text' },
  surname: { label: 'Фамилия', type: 'text' },
  patronymic: { label: 'Отчество', type: 'text' },
  phone: { label: 'Телефон', type: 'tel' },
  email: { label: 'E-mail', type: 'email' },
  login: { label: 'Логин', type: 'text' },
  car: { label: 'Ваш автомобиль', type: 'text' },
};

export const Profile: React.FC = () => {
  const user = useAppSelector(SelectUser);
  const dispatch = useAppDispatch();
  const status = useAppSelector(SelectAuthStatus);
  return (
    <ProfileLayout>
      <ProfileCard>
        <div className={styles.topbar}>
          <h1 className={styles.topbar__title}>Профиль пользователя</h1>
          <Button loading={status === Status.LOADING} onClick={() => dispatch(logoutAccount())}>
            Выйти
          </Button>
        </div>
        <form className={styles.form}>
          <ul className={styles.list}>
            {Object.entries(labels).map((prop) => (
              <li className={styles.list__item}>
                <p className={styles.list__label} title={prop[1].label}>
                  {prop[1].label}
                </p>
                <input className={styles.list__input} type={prop[1].type} value={user[prop[0]]} />
              </li>
            ))}
            <li className={classNames(styles.list__item, styles.list__item_password)}>
              <p className={styles.list__label} title={'Новый пароль'}>
                Новый пароль
              </p>
              <input className={styles.list__input} type={'password'} />
            </li>
            <li className={classNames(styles.list__item)}>
              <p className={styles.list__label} title={'Подтверждение нового пароля'}>
                Подтверждение нового пароля
              </p>
              <input className={styles.list__input} type={'password'} />
            </li>
          </ul>
          <Button style={{ marginLeft: 'auto' }} type='submit'>
            Сохранить
          </Button>
        </form>
      </ProfileCard>
    </ProfileLayout>
  );
};
export default Profile;