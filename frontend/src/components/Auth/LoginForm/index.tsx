import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Form, Field, withFormik, FormikProps } from 'formik';
import styles from './LoginForm.module.scss';
import LoginSchema from '../../../models/validation/LoginSchema';
import { SelectAuthStatus, loginAccount } from '../../../redux/slices/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { Status } from '../../../models/Status';
import { useAppSelector } from '../../../hooks/redux';
import Button from '../../common/Button';

interface FormValues {
  login: string;
  password: string;
}

let setSubmittingHigher;

const InnerForm: React.FC = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const status = useAppSelector(SelectAuthStatus);

  return (
    <Form className={styles.auth}>
      <h2 className={styles.auth__title}>Авторизация</h2>
      <div className={styles.auth__inputs}>
        <div className={classnames(styles.auth__forinput)}>
          <Field className={styles.auth__input} name='login' type='text' placeholder='Логин' />
          {errors.login && touched.login && <div>{errors.login}</div>}
        </div>
        <div className={classnames(styles.auth__forinput)}>
          <Field
            className={styles.auth__input}
            name='password'
            type='password'
            placeholder='Пароль'
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
      </div>
      <Button
        type='submit'
        className={classnames(styles.auth__button, 'button')}
        disabled={isSubmitting || status === Status.LOADING}
        loading={status === Status.LOADING}>
        Войти
      </Button>
    </Form>
  );
};

interface LoginProps {
  initialLogin?: string;
  loginAccount: (values: FormValues) => void;
}

export const EnhancedLoginForm = withFormik<LoginProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      login: props.initialLogin || '',
      password: '',
    };
  },

  validationSchema: LoginSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log(JSON.stringify(values));
    await props.loginAccount(values);
    setSubmitting(false);
  },
  displayName: 'LoginForm',
})(InnerForm);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginAccount,
    },
    dispatch,
  );

const LoginForm = connect(null, mapDispatchToProps)(EnhancedLoginForm);

export default LoginForm;
