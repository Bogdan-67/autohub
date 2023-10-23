import $api from '../http';
import { AxiosResponse } from 'axios';

export default class FilterService {
  static fetchFilters(
    category_id: number,
  ): Promise<AxiosResponse<{ [key: string]: string[] }, any>> {
    return $api.get<{ [key: string]: string[] }>(`/filters?category_id=${category_id}`);
  }
}
