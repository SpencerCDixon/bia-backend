'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBasicAuth = require('koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaValidate = require('koa-validate');

var _koaValidate2 = _interopRequireDefault(_koaValidate);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _habit = require('./models/habit');

var _habit2 = _interopRequireDefault(_habit);

var _goal = require('./models/goal');

var _goal2 = _interopRequireDefault(_goal);

var _weight = require('./models/weight');

var _weight2 = _interopRequireDefault(_weight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// Internal
// Libraries


var app = (0, _koa2.default)();
var router = (0, _koaRouter2.default)();

// Routes
router.redirect('/', '/habits').get('/habits', _habit2.default.index).get('/habits/:id', _habit2.default.show).post('/habits', _habit2.default.create).get('/goals', _goal2.default.index).get('/goals/:id', _goal2.default.show).post('/goals', _goal2.default.create).post('/weights', _weight2.default.create).get('/weights', _weight2.default.index);

// Middleware
app.use((0, _koaBody2.default)()).use((0, _koaValidate2.default)()).use((0, _koaLogger2.default)()).use((0, _koaCors2.default)()).use((0, _koaBasicAuth2.default)({
  name: _config2.default.userAuth, pass: _config2.default.userPass
})).use(router.routes());

// Listen
app.listen(_config2.default.PORT, function () {
  console.log('Listening on %s', _config2.default.PORT);
});

exports.default = app;