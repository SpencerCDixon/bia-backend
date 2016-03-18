var config = {
  PORT: process.env.port || 4200,
  DB_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/bia',
};

module.exports = config;
