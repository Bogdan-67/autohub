import { ButtonHTMLAttributes, MutableRefObject } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  ref?: MutableRefObject<HTMLButtonElement>;
  children: React.ReactNode;
}
