const Sequelize = require('sequelize');

const dbName = 'mrbartender';
console.log(`Opening database connection to ${dbName}`);

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

let config;

if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  config = {
    logging: false,
  };
}

const databaseUrl =
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

const db = new Sequelize(databaseUrl, {
  logging: false,
});

module.exports = db;
