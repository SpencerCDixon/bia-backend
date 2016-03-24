'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _monk = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/monk');

var _monk2 = _interopRequireDefault(_monk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATABASE_URL = process.env.MONGOLAB_URI;
var config = {
  PORT: process.env.PORT,
  DB_URL: DATABASE_URL,
  db: (0, _monk2.default)(DATABASE_URL),
  userAuth: process.env.AUTH_NAME,
  userPass: process.env.AUTH_PASS
};

exports.default = config;