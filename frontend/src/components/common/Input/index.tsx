import { FC } from 'react';
import { InputProps } from './input.props';

const Input: FC<InputProps> = ({ ...props }) => {
  return <input {...props} />;
};

export default Input;
