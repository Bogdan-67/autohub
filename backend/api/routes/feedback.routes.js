const Router = require('express');
const router = new Router();
const checkRole = require('../middlewares/check-role-middleware');
const feedbackController = require('../controller/feedback.controller');

router.post('/feedbacks', feedbackController.createFeedback);
router.get('/feedbacks', feedbackController.getFeedbacks);
router.delete('/feedbacks', feedbackController.deleteFeedback);

module.exports = router;
