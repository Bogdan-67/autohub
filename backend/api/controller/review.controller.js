const reviewService = require('../service/review-service');
const db = require('../db');

class ReviewController {
  async getReviews(req, res, next) {
    try {
      const reviews = await reviewService.getReviews(req.query);
      res.status(200).json(reviews);
    } catch (e) {
      next(e);
    }
  }
  async createReview(req, res, next) {
    try {
      const review = await reviewService.createReview(req.body);
      res.status(200).json(review);
    } catch (e) {
      await db.query('ROLLBACK');
      next(e);
    }
  }
  async deleteReview(req, res, next) {
    try {
      await reviewService.deleteReview(req.body);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReviewController();
