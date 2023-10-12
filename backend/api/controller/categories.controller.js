const categoriesService = require('../service/categories-service');

class CategoriesController {
  async getCategories(req, res, next) {
    try {
      const categories = await categoriesService.getCategories();
      res.status(200).json(categories);
    } catch (e) {
      next(e);
    }
  }
  async getOneCategory(req, res, next) {
    try {
      const category = await categoriesService.getOneCategory(req.params);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  }
  async createCategory(req, res, next) {
    try {
      const category = await categoriesService.createCategory(req.body);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  }
  async editCategory(req, res, next) {
    try {
      const category = await categoriesService.editCategory(req.body);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const category = await categoriesService.deleteCategory(req.body);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoriesController();
