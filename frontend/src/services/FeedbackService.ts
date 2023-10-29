import $api from '../http';
import { AxiosResponse } from 'axios';
import { IFeedback } from '../models/IFeedback';

export default class FeedbackService {
  static fetchFeedbacks(): Promise<AxiosResponse<IFeedback[]>> {
    return $api.get<IFeedback[]>('/feedbacks');
  }

  static createFeedback(
    message: string,
    contacts: string,
    user_id?: number,
  ): Promise<AxiosResponse<IFeedback>> {
    return $api.post<IFeedback>('/feedbacks', { message, contacts, user_id });
  }
}
