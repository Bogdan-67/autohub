import { FC } from 'react';
import { ButtonProps } from './button.props';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import classNames from 'classnames';

const Button: FC<ButtonProps> = ({ loading, ref, children, className, ...props }) => {
  return (
    <button
      ref={ref}
      className={classNames('button', className)}
      disabled={loading || props.disabled}
      {...props}>
      {loading ? <LoadingSpinner size={17} /> : <>{children}</>}
    </button>
  );
};

export default Button;
