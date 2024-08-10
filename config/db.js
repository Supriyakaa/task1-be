const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
 connectionString:process.env.POSTGRESQL_CONNECTION_STRING
});

module.exports = pool;
