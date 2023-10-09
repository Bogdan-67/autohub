import $api from '../http';
import { AxiosResponse } from 'axios';
import { ISlider } from '../models/ISlider';

export default class SliderService {
  static fetchSliderItems(): Promise<AxiosResponse<ISlider[]>> {
    return $api.get<ISlider[]>('/slider');
  }

  static createSliderItem(data: FormData): Promise<AxiosResponse<ISlider>> {
    return $api.post<ISlider>('/slider', data);
  }

  static editSliderItem(id: number, data: FormData): Promise<AxiosResponse<ISlider>> {
    return $api.put<ISlider>('/slider/' + id, data);
  }
}
