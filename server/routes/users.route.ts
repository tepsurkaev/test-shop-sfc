import { Router } from "express";
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/registration', usersController.registration);
router.post('/login', usersController.login);
router.get('/auth', authMiddleware, usersController.check);

module.exports = router;
