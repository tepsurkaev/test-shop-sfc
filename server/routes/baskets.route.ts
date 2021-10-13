import { Router } from "express";

const router = Router();

const basketsController = require("../controllers/baskets.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:id", authMiddleware, basketsController.getBasket);

module.exports = router;
