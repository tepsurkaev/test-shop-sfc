import { Router } from 'express';

const usersRoute = require('./users.route');
const basketsRoute = require('./baskets.route');
const productsRoute = require('./products.route');

const router = Router();

router.use('/user', usersRoute);
router.use('/basket', basketsRoute);
router.use('/product', productsRoute);

module.exports = router;
