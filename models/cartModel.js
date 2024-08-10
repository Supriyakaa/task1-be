
const db = require('../config/db');

exports.addToCart = async (userId, productId, quantity) => {
  const result = await db.query(`
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    RETURNING id;
  `, [userId, productId, quantity]);
  return result.rows[0].id;
};

exports.removeFromCart = async (userId, cartItemId) => {
  const result = await db.query(`
    DELETE FROM cart
    WHERE id = $1 AND user_id = $2
    RETURNING id;
  `, [cartItemId, userId]);
  return result.rowCount > 0;
};

exports.getCartItems = async (userId) => {
  const result = await db.query(`
    SELECT c.id, p.name, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = $1;
  `, [userId]);
  return result.rows;
};
