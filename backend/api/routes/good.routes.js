const Router = require('express');
const router = new Router();
const GoodController = require('../controller/good.controller');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/goods', checkRole('ADMIN'), GoodController.createGood);
router.get('/goods', GoodController.getGoods);
router.get('/filters', GoodController.getFilters);
router.get('/features', GoodController.getFeatures);
router.get('/goods/:id', GoodController.getOneGood);
router.put('/goods/:id', checkRole('ADMIN'), GoodController.updateGood);
router.delete('/goods/:id', checkRole('ADMIN'), GoodController.deleteGood);

module.exports = router;
