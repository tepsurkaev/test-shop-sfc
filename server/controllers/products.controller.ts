const productModel = require('../models/models');

class ProductsController {
  async createProduct(req: any, res: any) {
    const { name, price } = req.body;
    const product = await productModel.Product.create({
      name,
      price,
    });
    return res.json(product);
  }

  async getAllProducts(req: any, res: any) {
    const products = await productModel.Product.findAll();
    return res.json(products);
  }

  async getProductById(req: any, res: any) {
    const { id } = req.params;
    const product = await productModel.Product.findByPk(id);
    return res.json(product);
  }
}

module.exports = new ProductsController();
