import { SVGAttributes } from 'react';

export interface Props extends SVGAttributes<HTMLOrSVGElement> {
  size: number;
  padding?: number;
}
