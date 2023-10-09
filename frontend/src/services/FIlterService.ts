import { SelectItem } from '../components/Catalog/Filter/SelectFilter/SelectFilter.props';
import $api from '../http';
import { AxiosResponse } from 'axios';

export default class FilterService {
  static fetchFilters(
    category_id: number,
  ): Promise<AxiosResponse<{ [key: string]: SelectItem[] }, any>> {
    return $api.get<{ [key: string]: SelectItem[] }>(`/filters?category_id=${category_id}`);
  }
}
