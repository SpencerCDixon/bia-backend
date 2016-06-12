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

var _marked = [index, create, show].map(_regenerator2.default.mark);

/*
 * Goal:
 *  - name       String
 *  - category   String
 *  - complete   Boolean
 *  - timeFrame  Number  (time to complete in years)
 *  - completedAt Date
 */

var goals = (0, _coMonk2.default)(_config2.default.db.get('goals'));

function index() {
  return _regenerator2.default.wrap(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return goals.find({});

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
  var body, goal;
  return _regenerator2.default.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.checkBody('name').len(4);
          this.checkBody('timeFrame').isNumeric();
          this.checkBody('category').isString();

          body = this.request.body;

          body.complete = false;

          if (!this.errors) {
            _context2.next = 9;
            break;
          }

          (0, _respondWith2.default)(this, this.errors, 404);
          _context2.next = 13;
          break;

        case 9:
          _context2.next = 11;
          return goals.insert(body);

        case 11:
          goal = _context2.sent;

          (0, _respondWith2.default)(this, goal, 201);

        case 13:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function show() {
  var goal;
  return _regenerator2.default.wrap(function show$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return goals.findById(this.params.id);

        case 2:
          goal = _context3.sent;


          if (goal) {
            (0, _respondWith2.default)(this, goal, 200);
          } else {
            (0, _respondWith2.default)(this, {
              error: 'goal not found'
            }, 404);
          }

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

var actions = {
  create: create,
  show: show,
  index: index
};

exports.default = actions;