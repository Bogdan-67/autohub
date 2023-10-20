import $api from '../http';
import { AxiosResponse } from 'axios';
import { IGood } from '../models/IGood';

export default class GoodService {
  static async createGood(formdata: FormData): Promise<AxiosResponse<IGood>> {
    return $api.post<IGood>('/goods', formdata);
  }
  static async getGoods(category_id?: number, filters?: string): Promise<AxiosResponse<IGood[]>> {
    return $api.get<IGood[]>('/goods', { params: { category_id, filters } });
  }
}
