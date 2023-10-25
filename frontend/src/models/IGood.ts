import { ICategory } from './ICategory';
import { IFeature } from './IFeature';

export interface IGood {
  id_good: number;
  good_name: string;
  article: string;
  category_id: number;
  brand_id: number;
  brand_name?: string;
  price: number;
  photos: string[] | File[];
  description: string;
  storage: number;
  features?: Partial<IFeature>[];
  categories?: Partial<ICategory>[];
}
