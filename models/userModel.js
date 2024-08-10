const db = require('../config/db');

exports.createUser = async (username, password, role) => {
  const result = await db.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id',
    [username, password, role]
  );
  return result.rows[0].id;
};

exports.getUserByUsername = async (username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};
