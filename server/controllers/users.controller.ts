import { User, Basket } from "../models/models";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsersController {
  async registration(req: any, res: any) {
    const { email, password, role, products } = req.body;

    if (!email || !password) {
      return res.status(400).json("Некорректный эмайл или пароль");
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return res
        .status(400)
        .json("Пользователь с таким эмайлом уже сушествует");
    }

    const hash = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hash, role });
    const basket = await Basket.create({ userId: user.id, products });

    const payload = {
      id: user.id,
      email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return res.json({ token });
  }

  async login(req: any, res: any) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json("Неправильный эмайл или пароль");
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(401).json("Неправильный эмайл или пароль");
    }

    const payload = {
      id: user.id,
      email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return res.json({ token, payload });
  }

  async getUserById(req: any, res: any) {
    const { id } = req.user;
  }

  async check(req: any, res: any, next: any) {
    const payload = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    return res.json({ token });
  }
}

module.exports = new UsersController();
