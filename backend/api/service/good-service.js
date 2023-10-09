const db = require('../db');
const fs = require('fs');
const path = require('path');
const ApiError = require('../exceptions/api-error');

class GoodService {
  async getGoods() {
    const goods = await db.query(`SELECT * FROM goods`);
    return goods.rows;
  }
  async getGoodsByCategory(category_id) {
    const goods = await db.query(`SELECT * FROM goods WHERE category_id = $1`, [category_id]);
    return goods.rows;
  }
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
  async getFilters({ category_id }) {
    const goods = await this.getGoodsByCategory(category_id);
    const filters = new Object();
    for (let i in goods.rows) {
      const good_id = goods.rows[i].id_good;
      const features = await db.query(`SELECT * FROM good_features WHERE good_id = $1`, [good_id]);
      for (let featureIndex in features.rows) {
        const feature = features.rows[featureIndex];
        if (!filters[feature.title]) {
          filters[feature.title] = new Array();
          filters[feature.title].push({ id: feature.id_feature, title: feature.description });
        } else {
          if (!filters[feature.title].find((item) => item.id === feature.id))
            filters[feature.title].push({ id: feature.id_feature, title: feature.description });
        }
      }
    }
    return filters;
  }
  async createGood() {
    return 0;
  }
  async getOneGood() {
    return 0;
  }
  async editGood() {
    return 0;
  }
  async deleteGood() {
    return 0;
  }
}

module.exports = new GoodService();
