import wrap from 'co-monk';
import config from 'config';
import respondWith from 'util/respond-with';

/*
 * Habit:
 *  - description  String
 */

const habits = wrap(config.db.get('habits'));

function *index() {
  this.body = yield habits.find({});
}

function *create() {
  this.checkBody('name').len(4);

  if (this.errors) {
    respondWith(this, this.errors, 404);
  } else {
    const habit = yield habits.insert(this.request.body);
    respondWith(this, habit, 201);
  }
}

function *show() {
  const habit = yield habits.findById(this.params.id);

  if (habit) {
    respondWith(this, habit, 200);
  } else {
    respondWith(this, {
      error: 'habit not found',
    }, 404);
  }
}

const actions = {
  create,
  show,
  index,
};

export default actions;
