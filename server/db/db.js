const Sequelize = require('sequelize');

const dbName = 'mrbartender';
console.log(`Opening database connection to ${dbName}`);

const databaseUrl =
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

const db = new Sequelize(databaseUrl, {
  logging: false,
});

module.exports = db;
