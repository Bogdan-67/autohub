const db = require('../db');
const fs = require('fs');
const path = require('path');
const ApiError = require('../exceptions/api-error');

class UserService {
  async createSliderItem(img, title, description) {
    if (!title) {
      throw ApiError.BadRequest('Заголовок не может быть пустым!');
    }
    const sliderItem = await db.query(
      `INSERT INTO main_slider(img, title, description) VALUES ($1, $2, $3) RETURNING *`,
      [img, title, description],
    );
    return sliderItem.rows[0];
  }
  async getOneSliderItem() {
    return 0;
  }
  async getSliderItems() {
    const sliderItems = await db.query(`SELECT * FROM main_slider`);
    return sliderItems.rows;
  }
  async editSliderItem() {
    return 0;
  }
  async deleteSliderItem() {
    return 0;
  }
}

module.exports = new UserService();
