const cartModel = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItemId = await cartModel.addToCart(userId, productId, quantity);
    res.status(201).json({ id: cartItemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  const { id: userId } = req.user;
  try {
    const success = await cartModel.removeFromCart(userId, cartItemId);
    if (success) {
      res.status(200).json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

exports.getCartItems = async (req, res) => {
  const { id: userId } = req.user;
  console.log({ userId });
  try {
    const items = await cartModel.getCartItems(userId);
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve cart items" });
  }
};
