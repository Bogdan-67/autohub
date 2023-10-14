import React, { FC, useId } from 'react';
import Input from '../Input';
import styles from './EditInput.module.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  boxClass?: string;
};

const EditInput: FC<Props> = ({ title, type, value, boxClass, onChange }) => {
  const id = useId();
  return (
    <div className={classNames(styles.list__item, boxClass)}>
      <label htmlFor={id} className={styles.list__label} title={title}>
        {title}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={classNames('border-input', styles.list__input)}
          id={id}
          cols={40}
          rows={5}></textarea>
      ) : (
        <Input
          className={classNames('border-input', styles.list__input)}
          type={type}
          value={value}
          id={id}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default EditInput;
