import { AxiosResponse } from 'axios';
import $api from '../http';
import { ICategory } from '../models/ICategory';

export default class CategoriesService {
  static getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get<ICategory[]>('/categories');
  }
  static createCategory(name: string, parent: number | null): Promise<AxiosResponse<ICategory[]>> {
    return $api.post<ICategory[]>('/categories', { name, parent });
  }
}
