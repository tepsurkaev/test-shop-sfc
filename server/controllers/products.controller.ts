const path = require("path");
import { Product, ProductInfo } from "../models/models";

class ProductsController {
  async createProduct(req: any, res: any) {
    try {
      let { name, price, info } = req.body;

      const product = await Product.create({
        name,
        price,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((item: any) => {
          ProductInfo.create({
            title: item.title,
            description: item.description,
            productId: product.id,
          });
        });
      }

      return res.json(product);
    } catch (e: any) {
      return res.status(400).json(e.toString());
    }
  }

  async getAllProducts(req: any, res: any) {
    const products = await Product.findAll();
    return res.json(products);
  }

  async getProductById(req: any, res: any) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return res.json(product);
  }

  async deleteProduct(req: any, res: any) {
    const { id } = req.params;
    const deletingProduct = await Product.findByPk(id);
    await Product.destroy({
      where: { id },
    });
    return res.json(deletingProduct);
  }
}

module.exports = new ProductsController();
