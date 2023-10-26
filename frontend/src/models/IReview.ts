export interface IReview {
  id_review: number;
  text: string;
  rate: number;
  good_id?: number;
  user_id: number;
}
