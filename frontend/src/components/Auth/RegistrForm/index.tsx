import React, { useState } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, withFormik, FormikProps, FormikErrors } from 'formik';
import RegisterSchema from '../../../models/validation/RegisterSchema';
import styles from './RegistrForm.module.scss';
import MaskedInput from 'react-text-mask';
import { SelectAuthStatus, registrAccount } from '../../../redux/slices/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppSelector } from '../../../hooks/redux';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { Status } from '../../../models/Status.enum';
import Button from '../../common/Button';

export const phoneNumberMask = [
  '+',
  '7',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

interface FormValues {
  name: string;
  surname: string;
  patronimyc: string;
  phone: string;
  email: string;
  car: string;
  login: string;
  password: string;
  passwordCheck: string;
  recaptcha: string; // Добавлено поле для капчи
}

let setSubmittingHigher;

const InnerForm = (props: FormikProps<FormValues>) => {
  const [style, setStyle] = useState('');
  const error = 'border:1px solid red';
  const { values, touched, errors, isSubmitting } = props;
  const status = useAppSelector(SelectAuthStatus);
  return (
    <Form className={styles.auth}>
      <h2 className={styles.auth__title}>Регистрация</h2>
      <div className={styles.box}>
        <div className={styles.auth__inputs}>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.name && !errors.name,
              },
              { [styles.input_false]: touched.name && errors.name },
            )}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.name && touched.name ? '1px solid red' : '' }}
              name='name'
              type='text'
              placeholder='Имя'
            />
            {!errors.name && touched.name && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.name && touched.name && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.surname && !errors.surname,
              },
              { [styles.input_false]: touched.surname && errors.surname },
            )}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.surname && touched.surname ? '1px solid red' : '' }}
              name='surname'
              type='text'
              placeholder='Фамилия'
            />
            {!errors.surname && touched.surname && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.surname && touched.surname && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.surname && touched.surname && <div>{errors.surname}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.patronimyc && !errors.patronimyc,
              },
              { [styles.input_false]: touched.patronimyc && errors.patronimyc },
            )}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.patronimyc && touched.patronimyc ? '1px solid red' : '' }}
              name='patronimyc'
              type='text'
              placeholder='Отчество (если есть)'
            />
            {!errors.patronimyc && touched.patronimyc && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.patronimyc && touched.patronimyc && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.patronimyc && touched.patronimyc && <div>{errors.patronimyc}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.phone && !errors.phone,
              },
              { [styles.input_false]: touched.phone && errors.phone },
            )}>
            <Field
              style={{ border: errors.phone && touched.phone ? '1px solid red' : '' }}
              name='phone'
              type='tel'
              render={({ field }) => (
                <MaskedInput
                  className={styles.auth__input}
                  {...field}
                  placeholder='Телефон'
                  mask={phoneNumberMask}
                />
              )}
            />
            {!errors.phone && touched.phone && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.phone && touched.phone && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.phone && touched.phone && <div>{errors.phone}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.email && !errors.email,
              },
              { [styles.input_false]: touched.email && errors.email },
            )}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.email && touched.email ? '1px solid red' : '' }}
              name='email'
              type='email'
              placeholder='Email'
            />
            {!errors.email && touched.email && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.email && touched.email && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.email && touched.email && <div>{errors.email}</div>}
          </div>
          <div className={classnames(styles.auth__forinput)}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.car && touched.car ? '1px solid red' : '' }}
              name='car'
              type='text'
              placeholder='Ваш автомобиль'
            />
            {!errors.car && touched.car && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.car && touched.car && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.car && touched.car && <div>{errors.car}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.login && !errors.login,
              },
              { [styles.input_false]: touched.login && errors.login },
            )}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.login && touched.login ? '1px solid red' : '' }}
              name='login'
              type='text'
              placeholder='Логин'
            />
            {!errors.login && touched.login && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.login && touched.login && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.login && touched.login && <div>{errors.login}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.password && !errors.password,
              },
              { [styles.input_false]: touched.password && errors.password },
            )}>
            <Field
              className={styles.auth__input}
              style={{ border: errors.password && touched.password ? '1px solid red' : '' }}
              name='password'
              type='password'
              placeholder='Пароль'
            />
            {!errors.password && touched.password && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.password && touched.password && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.password && touched.password && <div>{errors.password}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.passwordCheck && !errors.passwordCheck,
              },
              { [styles.input_false]: touched.passwordCheck && errors.passwordCheck },
            )}>
            <Field
              className={styles.auth__input}
              style={{
                border: errors.passwordCheck && touched.passwordCheck ? '1px solid red' : '',
              }}
              name='passwordCheck'
              type='password'
              placeholder='Повторите пароль'
            />
            {!errors.passwordCheck && touched.passwordCheck && (
              <span>
                <FaCheckCircle className={classnames(styles.checkIcon, styles.checkIcon_true)} />
              </span>
            )}
            {errors.passwordCheck && touched.passwordCheck && (
              <span>
                <FaTimesCircle className={classnames(styles.checkIcon, styles.checkIcon_false)} />
              </span>
            )}
            {errors.passwordCheck && touched.passwordCheck && <div>{errors.passwordCheck}</div>}
          </div>
          <div
            className={classnames(
              styles.auth__forinput,
              {
                [styles.input_true]: touched.password && !errors.password,
              },
              { [styles.input_false]: touched.password && errors.password },
            )}>
            <ReCAPTCHA
              sitekey='6LdgYm4mAAAAACTOp4w9EpdEFelIVMomXK4EA5L_'
              onChange={(value) => {
                props.setFieldValue('recaptcha', value);
              }}
            />
            {errors.recaptcha && touched.recaptcha && <div>{errors.recaptcha}</div>}
          </div>
        </div>
      </div>
      <Button
        type='submit'
        className={classnames(styles.auth__button, 'button')}
        disabled={
          !values.name ||
          !values.surname ||
          !values.phone ||
          !values.email ||
          !values.login ||
          !values.password ||
          !values.passwordCheck ||
          !values.recaptcha ||
          !!errors.name ||
          !!errors.surname ||
          !!errors.email ||
          !!errors.login ||
          !!errors.password ||
          !!errors.passwordCheck ||
          !!errors.recaptcha ||
          !!errors.phone ||
          isSubmitting
        }
        loading={status === Status.LOADING}>
        Зарегистрироваться
      </Button>
    </Form>
  );
};

interface RegistrProps {
  initialLogin?: string;
  registrAccount: (values: FormValues) => void;
}

export const EnhancedRegistrForm = withFormik<RegistrProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: '',
      surname: '',
      patronimyc: '',
      phone: '',
      email: '',
      car: '',
      login: props.initialLogin || '',
      password: '',
      passwordCheck: '',
      recaptcha: '',
    };
  },

  validationSchema: RegisterSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    const changedPhone = values.phone
      .replace(/\)/g, '')
      .replace(/\(/g, '')
      .replace(/-/g, '')
      .replace(/ /g, '');
    const user = { ...values };
    user.phone = changedPhone;
    user.recaptcha = values.recaptcha;
    await props.registrAccount(user);
    setSubmitting(false);
  },
})(InnerForm);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      registrAccount,
    },
    dispatch,
  );

const RegistrForm = connect(null, mapDispatchToProps)(EnhancedRegistrForm);

export default RegistrForm;
