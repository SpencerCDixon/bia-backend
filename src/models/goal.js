/*
 * Goal:
 *  - name       String
 *  - complete   Boolean
 *  - timeFrame  Number  (time to complete in years)
 *  - createdAt  Date
 *  - completeAt Date
 */

var wrap   = require('co-monk'),
    parse  = require('co-body'),
    config = require('../config')
    goals = wrap(config.db.get('goals'))

function *index() {
  this.body = yield goals.find({});
}

function *create() {
  var body  = yield parse.json(this);
  var goal = yield goals.insert(body)
  respondWith(this, goal, 201);
}

function *show(opts) {
  var goal = yield goals.findOne(
    { description: this.params.name }
  );

  if (goal) {
    respondWith(this, goal, 200);
  } else {
    respondWith(this, {error: 'goal not found'}, 200);
  }
}

var exports = {
  create: create,
  show: show,
  index: index
};

module.exports = exports;

