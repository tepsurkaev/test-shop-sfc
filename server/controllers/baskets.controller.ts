const basketModel = require('../models/models');

class BasketsController {
  async getBasket(req: any, res: any) {
    const { id } = req.params;
    const userId = req.user;

    const basket = await basketModel.Basket.findByPk({ id });

    if (basket.userId === userId.id) {
      return res.json(basket);
    } else {
      return res.status(401).json('Не авторизован');
    }
  }
}

module.exports = new BasketsController();
