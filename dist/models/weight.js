'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _coMonk = require('co-monk');

var _coMonk2 = _interopRequireDefault(_coMonk);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _respondWith = require('../util/respond-with');

var _respondWith2 = _interopRequireDefault(_respondWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [index, create].map(_regenerator2.default.mark);

/*
 * Weight:
 *  - amount   Number
 *  - createdAt Date
 */

var weights = (0, _coMonk2.default)(_config2.default.db.get('weights'));

function index() {
  return _regenerator2.default.wrap(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return weights.find({});

        case 2:
          this.body = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function create() {
  var body, weight;
  return _regenerator2.default.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.checkBody('amount').isFloat();

          body = this.request.body;

          body.createdAt = Date.now();

          if (!this.errors) {
            _context2.next = 7;
            break;
          }

          (0, _respondWith2.default)(this, this.errors, 404);
          _context2.next = 11;
          break;

        case 7:
          _context2.next = 9;
          return weights.insert(body);

        case 9:
          weight = _context2.sent;

          (0, _respondWith2.default)(this, weight, 201);

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

exports.default = {
  index: index,
  create: create
};