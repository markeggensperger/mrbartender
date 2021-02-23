const Sequelize = require('sequelize');
const db = require('./db');

module.exports = db.define('tagpair', {
  measure: {
    type: Sequelize.STRING,
  },
});
