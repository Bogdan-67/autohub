const db = require('../db');

class FeedbackService {
  async getFeedbacks() {
    const feedbacks = await db.query(`SELECT * FROM feedbacks`);
    return feedbacks.rows;
  }
  async createFeedback({ message, contacts, user_id }) {
    const sql = `INSERT INTO feedbacks(message, contacts${user_id ? ', user_id' : ''}) 
    VALUES ($1, $2${user_id ? ', $3' : ''})
    RETURNING *`;
    const feedback = await db.query(sql, [message, contacts, user_id]);
    return feedback.rows[0];
  }
  async deleteFeedback() {}
}

module.exports = new FeedbackService();
