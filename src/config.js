import monk from 'monk';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const DATABASE_URL = process.env.MONGOLAB_URI;
const config = {
  PORT     : process.env.PORT,
  DB_URL   : DATABASE_URL,
  db       : monk(DATABASE_URL),
  userAuth : process.env.AUTH_NAME,
  userPass : process.env.AUTH_PASS,
};

export default config;
