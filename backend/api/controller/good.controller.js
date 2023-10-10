const goodService = require('../service/good-service');

class GoodController {
  async getGoods(req, res, next) {
    try {
      const goods = await goodService.getGoods(req.query);
      res.status(200).json(goods);
    } catch (e) {
      next(e);
    }
  }
  async getBrands(req, res, next) {
    try {
      const brands = await goodService.getBrands(req.query);
      res.status(200).json(brands);
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
      const good = await goodService.createGood();
      res.status(200).json(good);
    } catch (e) {
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
