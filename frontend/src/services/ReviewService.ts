import $api from '../http';
import { AxiosResponse } from 'axios';
import { IReview } from '../models/IReview';

export default class ReviewService {
  static fetchReviews(good_id?: number, user_id?: number): Promise<AxiosResponse<IReview[]>> {
    return $api.get<IReview[]>('/reviews', { params: { good_id, user_id } });
  }

  static createReview(
    good_id: number,
    user_id: number,
    text: string,
    rate: number,
  ): Promise<AxiosResponse<IReview>> {
    return $api.post<IReview>('/reviews', { good_id, user_id, text, rate });
  }
}
