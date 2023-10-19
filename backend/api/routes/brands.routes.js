const Router = require('express');
const router = new Router();
const BrandsController = require('../controller/brands.controller');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/brands', checkRole('ADMIN'), BrandsController.createBrand);
router.get('/brands-all', BrandsController.getBrands);
router.get('/brands/:id', BrandsController.getOneBrand);
router.put('/brands', checkRole('ADMIN'), BrandsController.editBrand);
router.delete('/brands', checkRole('ADMIN'), BrandsController.deleteBrand);

module.exports = router;
