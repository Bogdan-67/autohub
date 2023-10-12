const Router = require('express');
const router = new Router();
const CategoriesController = require('../controller/categories.controller');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/categories', checkRole('ADMIN'), CategoriesController.createCategory);
router.get('/categories', CategoriesController.getCategories);
router.get('/categories/:id', CategoriesController.getOneCategory);
router.put('/categories', checkRole('ADMIN'), CategoriesController.editCategory);
router.delete('/categories', checkRole('ADMIN'), CategoriesController.deleteCategory);

module.exports = router;
