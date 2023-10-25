import $api from '../http';
import { AxiosResponse } from 'axios';
import { IGood } from '../models/IGood';

export default class GoodService {
  static async createGood(formdata: FormData): Promise<AxiosResponse<IGood>> {
    return $api.post<IGood>('/goods', formdata);
  }

  static async getGoods(
    category_id?: number,
    filters?: { [key: string]: string[] },
  ): Promise<AxiosResponse<IGood[]>> {
    return $api.get<IGood[]>('/goods', {
      params: { category_id, filters: JSON.stringify(filters) },
    });
  }

  static async getGoodById(id: number): Promise<AxiosResponse<IGood>> {
    return $api.get<IGood>('/goods/' + id);
  }

  static async getFeatures(): Promise<AxiosResponse<string[]>> {
    return $api.get<string[]>('/features');
  }
}
