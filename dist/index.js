'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaLogger = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBasicAuth = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

var _koaBody = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaValidate = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/node_modules/koa-validate');

var _koaValidate2 = _interopRequireDefault(_koaValidate);

var _config = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/src/config');

var _config2 = _interopRequireDefault(_config);

var _habit = require('/Users/spencerdixon/Dropbox/CurrentProjects/Javascript/bia-backend/src/models/habit');

var _habit2 = _interopRequireDefault(_habit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal
// Libraries


var app = (0, _koa2.default)();
var router = (0, _koaRouter2.default)();

// Routes
router.redirect('/', '/habits').get('/habits', _habit2.default.index).get('/habits/:description', _habit2.default.show).post('/habits', _habit2.default.create);

// Middleware
app.use((0, _koaBody2.default)()).use((0, _koaValidate2.default)()).use((0, _koaLogger2.default)()).use((0, _koaBasicAuth2.default)({
  name: _config2.default.userAuth, pass: _config2.default.userPass
})).use(router.routes());

// Listen
app.listen(_config2.default.PORT, function () {
  console.log('Listening on %s', _config2.default.PORT);
});

exports.default = app;