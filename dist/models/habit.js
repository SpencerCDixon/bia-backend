'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coMonk = require('co-monk');

var _coMonk2 = _interopRequireDefault(_coMonk);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _respondWith = require('../util/respond-with');

var _respondWith2 = _interopRequireDefault(_respondWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [index, create, show].map(regeneratorRuntime.mark);

/*
 * Habit:
 *  - description  String
 */

var habits = (0, _coMonk2.default)(_config2.default.db.get('habits'));

function index() {
  return regeneratorRuntime.wrap(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return habits.find({});

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
  var habit;
  return regeneratorRuntime.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.checkBody('name').len(4);

          if (!this.errors) {
            _context2.next = 5;
            break;
          }

          (0, _respondWith2.default)(this, this.errors, 404);
          _context2.next = 9;
          break;

        case 5:
          _context2.next = 7;
          return habits.insert(this.request.body);

        case 7:
          habit = _context2.sent;

          (0, _respondWith2.default)(this, habit, 201);

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function show() {
  var habit;
  return regeneratorRuntime.wrap(function show$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return habits.findById(this.params.id);

        case 2:
          habit = _context3.sent;


          if (habit) {
            (0, _respondWith2.default)(this, habit, 200);
          } else {
            (0, _respondWith2.default)(this, {
              error: 'habit not found'
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