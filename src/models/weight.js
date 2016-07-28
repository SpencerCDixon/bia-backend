import wrap from 'co-monk';
import config from '../config';
import respondWith from '../util/respond-with';
/*
 * Weight:
 *  - amount   Number
 *  - createdAt Date
 */

const weights = wrap(config.db.get('weights'));

function *index() {
  this.body = yield weights.find({});
}

function *create() {
  this.checkBody('amount').isFloat();

  const body = this.request.body;
  body.createdAt = Date.now();

  if (this.errors) {
    respondWith(this, this.errors, 404);
  } else {
    const weight = yield weights.insert(body);
    respondWith(this, weight, 201);
  }
}

export default {
  index,
  create,
};
