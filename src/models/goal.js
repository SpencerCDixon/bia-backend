import wrap from 'co-monk';
import config from 'config';
import respondWith from 'util/respond-with';
/*
 * Goal:
 *  - name       String
 *  - complete   Boolean
 *  - timeFrame  Number  (time to complete in years)
 *  - completedAt Date
 */

const goals = wrap(config.db.get('goals'));

function *index() {
  this.body = yield goals.find({});
}

function *create() {
  this.checkBody('name').len(4);
  this.checkBody('timeFrame').isNumeric();

  const body = this.request.body;
  body.complete = false;

  if (this.errors) {
    respondWith(this, this.errors, 404);
  } else {
    const goal = yield goals.insert(body);
    respondWith(this, goal, 201);
  }
}

function *show() {
  const goal = yield goals.findById(this.params.id);

  if (goal) {
    respondWith(this, goal, 200);
  } else {
    respondWith(this, {
      error: 'goal not found',
    }, 404);
  }
}

const actions = {
  create,
  show,
  index,
};

export default actions;
