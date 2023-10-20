import $api from '../http';
import { AxiosResponse } from 'axios';
import { IBrand } from '../models/IBrand';

export default class BrandService {
  // FIXME: Понять почему не работает /brands
  static getBrands(category_id?: number): Promise<AxiosResponse<IBrand[]>> {
    return $api.get<IBrand[]>(`/brands-all${category_id ? `?category_id=${category_id}` : ''}`);
  }
  static createBrand(formdata: FormData): Promise<AxiosResponse<IBrand>> {
    return $api.post<IBrand>('/brands', formdata);
  }
}
