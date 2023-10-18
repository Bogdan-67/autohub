const db = require('../db');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const ApiError = require('../exceptions/api-error');

class BrandService {
  async getBrands({ category_id }) {
    const brandsFromDb = await db.query(`SELECT * FROM brands`);
    if (category_id) {
      const goods = await this.getGoodsByCategory(category_id);
      let brands = [];
      for (let i in goods.rows) {
        const good = goods.rows[i];
        if (!brands.find((brand) => brand.id_brand === good.brand_id))
          brands.push(brandsFromDb.find((brand) => brand.id_brand === good.brand_id));
      }
      return brands;
    } else return brandsFromDb.rows;
  }
  async createBrand({ name, description, logo }) {
    if (!name) {
      throw ApiError.BadRequest('Название не может быть пустым!');
    }
    if (!logo) {
      throw ApiError.BadRequest('Фото отсутствует!');
    }
    const brand = await db.query(
      `INSERT INTO brands(name, description, logo) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, logo],
    );
    return brand;
  }
  async getOneBrand() {
    return 0;
  }
  async editBrand() {
    return 0;
  }
  async deleteBrand() {
    return 0;
  }
}

module.exports = new BrandService();
