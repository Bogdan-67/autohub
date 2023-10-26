const db = require('../db');
const ApiError = require('../exceptions/api-error');

class ReviewService {
  async getReviews({ good_id, user_id }) {
    const userCondition = user_id ? 'AND user_id = $2' : '';
    const goodCondition = good_id ? 'AND good_id = $1' : '';
    const sql = `SELECT * FROM good_reviews WHERE TRUE ${goodCondition} ${userCondition}`;
    const reviews = await db.query(sql, [good_id, user_id].filter(Boolean));
    return reviews.rows;
  }

  async createReview({ good_id, user_id, text, rate }) {
    if (!good_id) {
      throw ApiError.BadRequest('');
    }
    if (!user_id) {
      throw ApiError.BadRequest('');
    }
    if (!text) {
      throw ApiError.BadRequest('');
    }
    if (!rate) {
      throw ApiError.BadRequest('');
    }
    await db.query('BEGIN');
    const review = await db.query(
      `INSERT INTO good_reviews(good_id, user_id, text, rate) VALUES ($1, $2, $3, $4) RETURNING *`,
      [good_id, user_id, text, rate],
    );
    const rating = await db.query(
      `SELECT AVG(rate) as rating FROM good_reviews WHERE good_id = $1`,
      [good_id],
    );
    const goodRating = rating.rows[0].rating ? rating.rows[0].rating : 0;
    await db.query(`UPDATE goods SET rating = $1 WHERE id_good = $2 RETURNING *`, [
      goodRating,
      good_id,
    ]);
    await db.query('COMMIT');
    return review.rows[0];
  }

  async deleteReview({ id_review }) {
    await db.query(`DELETE FROM good_reviews WHERE id_review = $1`, [id_review]);
    return 0;
  }
}

module.exports = new ReviewService();
