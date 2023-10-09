const Router = require('express');
const router = new Router();
const GoodController = require('../controller/good.controller');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/slider', checkRole('ADMIN'), sliderController.createSliderItem);
router.get('/goods', GoodController.getGoods);
router.get('/filters', GoodController.getFilters);
router.get('/slider/:id', sliderController.getOneSliderItem);
router.put('/slider/:id', checkRole('ADMIN'), sliderController.editSliderItem);
router.delete('/slider/:id', checkRole('ADMIN'), sliderController.deleteSliderItem);

module.exports = router;
