const Router = require('express');
const router = new Router();
const sliderController = require('../controller/slider.controller');
const checkRole = require('../middlewares/check-role-middleware');

router.post('/slider', checkRole('ADMIN'), sliderController.createSliderItem);
router.get('/slider', sliderController.getSliderItems);
router.get('/slider/:id', sliderController.getOneSliderItem);
router.put('/slider/:id', checkRole('ADMIN'), sliderController.editSliderItem);
router.delete('/slider/:id', checkRole('ADMIN'), sliderController.deleteSliderItem);

module.exports = router;
