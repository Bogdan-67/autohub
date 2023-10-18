import $api from '../http';
import { AxiosResponse } from 'axios';
import { IBrand } from '../models/IBrand';

export default class BrandService {
  static async createBrand(formdata: FormData): Promise<AxiosResponse<IBrand>> {
    return $api.post<IBrand>('/brands', formdata);
  }
}
