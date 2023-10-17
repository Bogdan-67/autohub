import { InputHTMLAttributes } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  boxClassName?: string;
  error?: string;
}
