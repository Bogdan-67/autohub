import { FC } from 'react';
import { ButtonProps } from './button.props';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Button: FC<ButtonProps> = ({ loading, ref, children, ...props }) => {
  return (
    <button ref={ref} className='button' disabled={loading || props.disabled} {...props}>
      {loading ? <LoadingSpinner size={17} /> : <>{children}</>}
    </button>
  );
};

export default Button;
