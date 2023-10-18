import { FC } from 'react';
import { InputProps } from './input.props';
import classNames from 'classnames';
import styles from './BorderInput.module.scss';

const BorderInput: FC<InputProps> = ({ width, boxClassName, className, error, ...props }) => {
  return (
    <div className={classNames(styles.box, boxClassName)}>
      <input className={classNames('border-input', styles.input, className)} {...props} />
      {error && (
        <span title={error} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
};

export default BorderInput;
