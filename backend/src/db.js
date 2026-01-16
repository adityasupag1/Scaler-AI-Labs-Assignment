const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "trello_db",
  password: "#wqSA!52apP!Z2s#",
  port: 5432,
});

module.exports = pool;
