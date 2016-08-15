import wrap from 'co-monk';
import config from '../config';
import respondWith from '../util/respond-with';

/*
 * User:
 *  - email       String
 *  - password   String
 */

const users = wrap(config.db.get('users'));

function *index() {
  this.body = yield users.find({})
}

function *create() {
  this.checkBody('email').isEmail("enter a valid email");
  this.checkBody('password').notEmpty().len(3, 20).md5();

  if (this.errors) {
    respondWith(this, this.errors, 404)
  }
  const user = yield users.insert(this.request.body)
  respondWith(this, user, 201);
}

const actions = {
  create,
  index,
}

export default actions;
