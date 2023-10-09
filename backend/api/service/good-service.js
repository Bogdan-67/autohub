const db = require('../db');
const fs = require('fs');
const path = require('path');
const ApiError = require('../exceptions/api-error');

class GoodService {
  async getGoods() {
    const goods = await db.query(`SELECT * FROM goods`);
    return goods.rows;
  }
  async getFilters({ type_id }) {
    const goods = await db.query(`SELECT * FROM goods WHERE type_id = $1`, [type_id]);
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
