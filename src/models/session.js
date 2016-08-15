import wrap        from 'co-monk';
import koaJwt      from 'koa-jwt';
import config      from '../config';
import respondWith from '../util/respond-with';

const users = wrap(config.db.get('users'));

function *authenticate(next) {
  this.checkBody('email').isEmail();
  this.checkBody('password').notEmpty().md5();
  const { email, password } = this.request.body;

  const user = yield users.findOne({email: email})

  if (this.errors) {
    return respondWith(this, this.errors, 404)
  }

  if (!user) {
    return respondWith(this, "No user found", 404)
  }

  if (user.password === password) {
    const token = koaJwt.sign({ email }, config.secret, { expiresIn: "7d" })
    return respondWith(this, {token}, 201);
  }

  respondWith(this, "Ddint work", 404);
}

const actions = {
  authenticate,
}

export default actions;
