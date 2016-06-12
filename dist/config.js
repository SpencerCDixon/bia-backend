'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var DATABASE_URL = process.env.MONGOLAB_URI;
var config = {
  PORT: process.env.PORT,
  DB_URL: DATABASE_URL,
  db: (0, _monk2.default)(DATABASE_URL),
  userAuth: process.env.AUTH_NAME,
  userPass: process.env.AUTH_PASS
};

exports.default = config;