const productModel = require('../models/productModel');

exports.addProduct = async (req, res) => {
  const { name, category, description, price, discount, sellerId } = req.body;
  
  try {
    const productId = await productModel.createProduct(name, category, description, price, discount, sellerId);
    res.status(201).json({ id: productId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, discount, sellerId } = req.body;
  
  try {
    const success = await productModel.updateProduct(id, name, category, description, price, discount, sellerId);
    if (success) {
      res.status(200).json({ message: 'Product updated' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { sellerId } = req.body;
  
  try {
    const success = await productModel.deleteProduct(id, sellerId);
    if (success) {
      res.status(200).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

exports.getProducts = async (req, res) => {
  const { search } = req.query;
  
  try {
    const products = await productModel.getProducts(search);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};
