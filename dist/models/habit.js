'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _marked = [index, create, show].map(regeneratorRuntime.mark);

var wrap = require('co-monk'),
    parse = require('co-body'),
    config = require('../config');
habits = wrap(config.db.get('habits'));

var respondWith = require('../util/respond-with');

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
          this.checkBody('description').len(5);

          if (!this.errors) {
            _context2.next = 5;
            break;
          }

          respondWith(this, this.errors, 404);
          _context2.next = 9;
          break;

        case 5:
          _context2.next = 7;
          return habits.insert(this.request.body);

        case 7:
          habit = _context2.sent;

          respondWith(this, habit, 201);

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function show(opts) {
  var habit;
  return regeneratorRuntime.wrap(function show$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return habits.findOne({ description: this.params.description });

        case 2:
          habit = _context3.sent;


          if (habit) {
            respondWith(this, habit, 200);
          } else {
            respondWith(this, { error: 'habit not found' }, 200);
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