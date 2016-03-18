var monk = require('monk');

var DATABASE_URL = process.env.MONGOLAB_URI;

var config = {
  PORT: process.env.PORT,
  DB_URL: DATABASE_URL,
  db: monk(DATABASE_URL)
};

module.exports = config;
