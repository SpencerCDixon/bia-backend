import wrap        from 'co-monk';
import koaJwt      from 'koa-jwt';
import config      from '../config';
import respondWith from '../util/respond-with';

const users = wrap(config.db.get('users'));

function *authenticate() {
  this.checkBody('email').isEmail();
  this.checkBody('password').notEmpty().md5();

  const { email, password } = this.request.body;
  const user = yield users.findOne({email: email})

  if (this.errors) respondWith(this, this.errors, 404)
  else if (!user)  respondWith(this, "No user found", 404)
  else if (user.password === password) {
    const token = koaJwt.sign(
      { _id: user._id, email: email }, config.secret, { expiresIn: "7d" }
    )
    return respondWith(this, { token }, 201);
  }
  else respondWith(this, { errors: "Authentication failed" }, 403);
}

// function *verify() {
  // const token = this.request.body.token ||
                // this.request.query.token ||
                // this.request.headers['x-access-token'];

  // if (!token) {
    // respondWith(this, { error: "Not a valid jwt token" }, 403)
  // } else {
    // const verified = koaJwt.verify(token, config.secret)
    // respondWith(this, { verified }, 200);
  // }
// }

const actions = {
  authenticate,
  // verify,
}

export default actions;
