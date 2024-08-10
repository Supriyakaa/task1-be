
const db = require('../config/db');

exports.createProduct = async (name, category, description, price, discount, sellerId) => {
  const result = await db.query(`
    INSERT INTO products (name, category, description, price, discount, seller_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `, [name, category, description, price, discount, sellerId]);
  return result.rows[0].id;
};

exports.updateProduct = async (id, name, category, description, price, discount, sellerId) => {
  const result = await db.query(`
    UPDATE products
    SET name = $2, category = $3, description = $4, price = $5, discount = $6
    WHERE id = $1 AND seller_id = $7
    RETURNING id;
  `, [id, name, category, description, price, discount, sellerId]);
  return result.rowCount > 0;
};

exports.deleteProduct = async (id, sellerId) => {
  const result = await db.query(`
    DELETE FROM products
    WHERE id = $1 AND seller_id = $2
    RETURNING id;
  `, [id, sellerId]);
  return result.rowCount > 0;
};

exports.getProducts = async (search) => {
  let query = 'SELECT * FROM products';
  const params = [];

  if (search) {
    query += ' WHERE name ILIKE $1 OR category ILIKE $1 OR description ILIKE $1';
    params.push(`%${search}%`);
  }

  const result = await db.query(query, params);
  return result.rows;
};
