import { Router } from 'express';
const productsController = require('../controllers/products.controller');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = Router();

router.post('/', roleMiddleware, productsController.createProduct);
router.get('/products', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.delete('/:id', roleMiddleware, productsController.deleteProduct);

module.exports = router;
