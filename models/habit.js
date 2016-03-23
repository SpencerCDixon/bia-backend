var wrap   = require('co-monk'),
    parse  = require('co-body'),
    config = require('../config')
    habits = wrap(config.db.get('habits'))

var respondWith = require('../util/respond-with');

function *index() {
  this.body = yield habits.find({});
}

function *create() {
  this.checkBody('description').len(5);

  if (this.errors) {
    respondWith(this, this.errors, 404);
  } else {
    var habit = yield habits.insert(this.request.body)
    respondWith(this, habit, 201);
  }
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
