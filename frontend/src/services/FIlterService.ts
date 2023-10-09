import { SelectItem } from '../components/Catalog/Filter/SelectFilter/SelectFilter.props';
import $api from '../http';
import { AxiosResponse } from 'axios';

export default class FilterService {
  static fetchFilters(type_id: number): Promise<AxiosResponse<{ [key: string]: SelectItem }>> {
    return $api.get<{ [key: string]: SelectItem }>(`/filters?type_id=${type_id}`);
  }
}
