const db = require('../db');
const ApiError = require('../exceptions/api-error');

class CategoriesService {
  async getCategories() {
    const categories = await db.query(`SELECT * FROM categories`);
    return categories.rows;
  }
  async createCategory({ name, parent }) {
    const category = await db.query(
      `INSERT INTO categories(name, parent) VALUES($1, $2) RETURNING *`,
      [name, parent],
    );
    return this.getCategories();
  }
  async getOneCategory() {
    return 0;
  }
  async editCategory() {
    return 0;
  }
  async deleteCategory() {
    return 0;
  }
}

module.exports = new CategoriesService();
