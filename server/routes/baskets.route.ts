import { Router } from 'express';
const basketsController = require('../controllers/baskets.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/:id', authMiddleware, basketsController.getBasket);

module.exports = router;
