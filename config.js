var monk = require('monk');

var DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/bia';

var config = {
  PORT: process.env.PORT || 4200,
  DB_URL: DATABASE_URL,
  db: monk(DATABASE_URL)
};

module.exports = config;
