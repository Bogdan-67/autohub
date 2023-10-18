const goodService = require('../service/good-service');
const db = require('../db');

class GoodController {
  async getGoods(req, res, next) {
    try {
      const goods = await goodService.getGoods(req.query);
      res.status(200).json(goods);
    } catch (e) {
      next(e);
    }
  }
  async getFilters(req, res, next) {
    try {
      const filters = await goodService.getFilters(req.query);
      res.status(200).json(filters);
    } catch (e) {
      next(e);
    }
  }
  async createGood(req, res, next) {
    try {
      console.log(req.body, req.files);
      let photos = null;
      const features = req.body['features[]'];
      if (req.files && req.files['photos[]']) {
        photos = req.files['photos[]'];
      }
      const good = await goodService.createGood(req.body, features, photos);
      res.status(200).json(good);
    } catch (e) {
      await db.query('ROLLBACK');
      next(e);
    }
  }
  async getOneGood(req, res, next) {
    try {
      const good = await goodService.getOneGood();
      res.status(200).json(good);
    } catch (e) {
      next(e);
    }
  }
  async updateGood(req, res, next) {
    try {
      const good = await goodService.updateGood();
      res.status(200).json(good);
    } catch (e) {
      next(e);
    }
  }
  async deleteGood(req, res, next) {
    try {
      const good = await goodService.deleteGood();
      res.status(200).json(good);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GoodController();
