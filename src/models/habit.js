import wrap from 'co-monk';
import config from 'config';
import respondWith from 'util/respond-with';

const habits = wrap(config.db.get('habits'));

function *index() {
  this.body = yield habits.find({});
}

function *create() {
  this.checkBody('description').len(5);

  if (this.errors) {
    respondWith(this, this.errors, 404);
  } else {
    var habit = yield habits.insert(this.request.body);
    respondWith(this, habit, 201);
  }
}

function *show() {
  var habit = yield habits.findOne(
    { description: this.params.description.split('_').join(' '), }
  );

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
