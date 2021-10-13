import { Router } from "express";

const router = Router();

const usersRoute = require("./users.route");
const basketsRoute = require("./baskets.route");
const productsRoute = require("./products.route");

router.use("/user", usersRoute);
router.use("/basket", basketsRoute);
router.use("/product", productsRoute);

module.exports = router;
