export interface IReview {
  id_review: number;
  text: string;
  rate: number;
  good_id?: number;
  user_id: number;
  name: string;
  surname: string;
  car?: string;
  created_at: string;
}
