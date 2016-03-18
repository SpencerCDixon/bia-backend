var monk   = require('monk'),
    wrap   = require('co-monk'),
    parse  = require('co-body'),
    config = require('../config')
    db     = monk(config.DB_URL),
    habits = wrap(db.get('habits'))

var respondWith = require('../util/respond-with');

function *index() {
  this.body = yield habits.find({});
}

function *create() {
  var body  = yield parse.json(this);
  var habit = yield habits.insert(body)
  respondWith(this, habit, 201);
}

function *show(opts) {
  var habit = yield habits.findOne(
    { description: this.params.description }
  );

  if (habit) {
    respondWith(this, habit, 200);
  } else {
    respondWith(this, {error: 'habit not found'}, 200);
  }
}

var exports = {
  create: create,
  show: show,
  index: index
};

module.exports = exports;
