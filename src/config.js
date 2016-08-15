import monk from 'monk';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const isTest = process.env.NODE_ENV === 'test';

let DATABASE_URL = process.env.MONGOLAB_URI;
DATABASE_URL = isTest ? DATABASE_URL + '/test' : DATABASE_URL;

const config = {
  PORT     : process.env.PORT,
  DB_URL   : DATABASE_URL,
  db       : monk(DATABASE_URL),
  userAuth : process.env.AUTH_NAME,
  userPass : process.env.AUTH_PASS,
  secret   : process.env.JWT_SECRET,
};

export default config;
