const db = require('../db');
const feedbackService = require('../service/feedback-service');

class FeedbackController {
  async getFeedbacks(req, res, next) {
    try {
      const feedbacks = await feedbackService.getFeedbacks(req.query);
      res.status(200).json(feedbacks);
    } catch (e) {
      next(e);
    }
  }
  async createFeedback(req, res, next) {
    try {
      const feedback = await feedbackService.createFeedback(req.body);
      res.status(200).json(feedback);
    } catch (e) {
      next(e);
    }
  }
  async deleteFeedback(req, res, next) {
    try {
      await feedbackService.deleteFeedback(req.body);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FeedbackController();
