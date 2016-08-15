// Libraries
import koa         from 'koa';
import koaRouter   from 'koa-router';
import koaLogger   from 'koa-logger';
import koaAuth     from 'koa-basic-auth';
import koaBody     from 'koa-body';
import koaValidate from 'koa-validate';
import koaCors     from 'koa-cors';
import koaJwt      from 'koa-jwt';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// Internal
import config   from './config';
import habits   from './models/habit';
import goals    from './models/goal';
import weights  from './models/weight';
import users    from './models/user';
import sessions from './models/session';

const app = koa();
const unauthRouter = koaRouter({ prefix: '/api' });
const authRouter   = koaRouter({ prefix: '/api' });

// Routes
unauthRouter
  .post('/authenticate', sessions.authenticate)
  // .post('/verify', sessions.verify)
  .post('/users', users.create);

function *jwtAuthentication(next) {
  const token = this.request.body.token ||
                this.request.query.token ||
                this.request.headers['x-access-token'];

  if (!token) {
    this.body = { error: "Unathenticated" };
    this.status = 403;
  } else {
    const verified = koaJwt.verify(token, config.secret)
    this.userId = verified['_id'];
    yield next
  }
}

authRouter
  .use(jwtAuthentication)
  .get('/habits', habits.index)
  .get('/habits/:id', habits.show)
  .post('/habits', habits.create)
  .get('/goals', goals.index)
  .get('/goals/:id', goals.show)
  .post('/goals', goals.create)
  .post('/weights', weights.create)
  .get('/weights', weights.index);

// Middleware
app
  .use(koaBody())
  .use(koaValidate())
  .use(koaLogger())
  .use(koaCors())
  .use(koaJwt({ secret: config.secret, passthrough: true }))
  .use(unauthRouter.routes())
  .use(authRouter.routes());

// Listen
app.listen(config.PORT, function() {
  console.log('Listening on %s', config.PORT);
});

export default app;
