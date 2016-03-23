'use strict';

var _marked = [index, create, show].map(regeneratorRuntime.mark);

/*
 * Goal:
 *  - name       String
 *  - complete   Boolean
 *  - timeFrame  Number  (time to complete in years)
 *  - createdAt  Date
 *  - completeAt Date
 */

var wrap = require('co-monk'),
    parse = require('co-body'),
    config = require('../config');
goals = wrap(config.db.get('goals'));

function index() {
  return regeneratorRuntime.wrap(function index$(_context) {
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
  return regeneratorRuntime.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return parse.json(this);

        case 2:
          body = _context2.sent;
          _context2.next = 5;
          return goals.insert(body);

        case 5:
          goal = _context2.sent;

          respondWith(this, goal, 201);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function show(opts) {
  var goal;
  return regeneratorRuntime.wrap(function show$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return goals.findOne({ description: this.params.name });

        case 2:
          goal = _context3.sent;


          if (goal) {
            respondWith(this, goal, 200);
          } else {
            respondWith(this, { error: 'goal not found' }, 200);
          }

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

var _exports = {
  create: create,
  show: show,
  index: index
};

module.exports = _exports;