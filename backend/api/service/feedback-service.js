const db = require('../db');

class FeedbackService {
  async getFeedbacks() {
    const feedbacks = await db.query(
      `SELECT id_feedback, user_id, message, contacts, name, surname, created_at FROM feedbacks LEFT JOIN users ON user_id=id_user`,
    );
    return feedbacks.rows;
  }
  async createFeedback({ message, contacts, user_id }) {
    const sql = `INSERT INTO feedbacks(message, contacts${user_id ? ', user_id' : ''}) 
    VALUES ($1, $2${user_id ? ', $3' : ''})
    RETURNING *`;
    const values = [message, contacts];
    if (user_id) values.push(user_id);
    const feedback = await db.query(sql, values);
    return feedback.rows[0];
  }
  async deleteFeedback() {}
}

module.exports = new FeedbackService();
