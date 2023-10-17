import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class GoodService {
  static async createGood(formdata: FormData): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/goods', formdata);
  }
}
