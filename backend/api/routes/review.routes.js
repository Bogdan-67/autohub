const Router = require('express');
const router = new Router();
const checkRole = require('../middlewares/check-role-middleware');
const reviewController = require('../controller/review.controller');

router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getReviews);
router.delete('/reviews', reviewController.deleteReview);

module.exports = router;
