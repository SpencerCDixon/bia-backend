'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBasicAuth = require('koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaValidate = require('koa-validate');

var _koaValidate2 = _interopRequireDefault(_koaValidate);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _habit = require('./models/habit');

var _habit2 = _interopRequireDefault(_habit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal
// Libraries


var app = (0, _koa2.default)();

// Routes
_koaRouter2.default.redirect('/', '/habits/something').get('/habits', _habit2.default.index).get('/habits/:description', _habit2.default.show).post('/habits', _habit2.default.create);

// Middleware
app.use((0, _koaBody2.default)()).use((0, _koaValidate2.default)()).use((0, _koaLogger2.default)()).use((0, _koaBasicAuth2.default)({
  name: process.env.AUTH_NAME, pass: process.env.AUTH_PASS
})).use(_koaRouter2.default.routes());

// Listen
app.listen(_config2.default.PORT, function () {
  console.log('Listening on %s', _config2.default.PORT);
});