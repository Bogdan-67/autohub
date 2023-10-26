module.exports = class ReviewDTO {
  id_review;
  text;
  rate;
  good_id;
  user_id;
  name;
  surname;
  car;
  created_at;

  constructor(model) {
    this.id_review = model.id_review;
    this.user_id = model.user_id;
    this.name = model.name;
    this.surname = model.surname;
    this.good_id = model.good_id;
    this.text = model.text;
    this.rate = model.rate;
    this.car = model.car;
    this.created_at = model.created_at;
  }
};
