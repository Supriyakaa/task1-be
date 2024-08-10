
const productModel = require('../models/productModel');

exports.searchProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const products = await productModel.getProducts(search);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};
