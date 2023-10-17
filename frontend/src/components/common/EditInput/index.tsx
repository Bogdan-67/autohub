import React, { FC, useId } from 'react';
import Input from '../BorderInput';
import styles from './EditInput.module.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  boxClass?: string;
  children?: React.ReactNode;
};

const EditInput: FC<Props> = ({ title, type, value, boxClass, onChange, children }) => {
  const id = useId();
  return (
    <div className={classNames(styles.list__item, boxClass)}>
      <label htmlFor={id} className={styles.list__label} title={title}>
        {title}
      </label>
      {children ? (
        <div id={id} className={styles.list__input}>
          {children}
        </div>
      ) : type === 'textarea' ? (
        <textarea
          className={classNames('border-input', styles.list__input)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          cols={40}
          rows={5}></textarea>
      ) : (
        <Input
          boxClassName={styles.list__input}
          type={type || 'text'}
          value={value}
          id={id}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default EditInput;
