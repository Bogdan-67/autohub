const goodService = require('../service/good-service');

class GoodController {
  async getGoods(req, res, next) {
    try {
      const goods = await goodService.getGoods();
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
}

module.exports = new GoodController();
