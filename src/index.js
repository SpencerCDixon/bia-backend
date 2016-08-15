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
import config from './config';
import habits from './models/habit';
import goals  from './models/goal';
import weights from './models/weight';
import users from './models/user';

const app = koa();
const router = koaRouter({ prefix: '/api' });

// Routes
router
  .redirect('/', '/habits')
  .get('/habits', habits.index)
  .get('/habits/:id', habits.show)
  .post('/habits', habits.create)
  .get('/goals', goals.index)
  .get('/goals/:id', goals.show)
  .post('/goals', goals.create)
  .post('/weights', weights.create)
  .get('/weights', weights.index)
  .get('/users', users.index)
  .post('/users', users.create);

// Middleware
app
  .use(koaBody())
  .use(koaValidate())
  .use(koaLogger())
  .use(koaCors())
  .use(koaJwt({ secret: config.secret, passthrough: true }))
  // .use(function *(next) {
    // console.log('CHECKING JWT');

    // if (this.url.match(/^\/login/)) {
      // console.log('INSIDE MATCH');
      // var token = koaJwt.sign({
        // user: 'example'
      // }, config.secret, { expiresIn: "7d" });
      // this.status = 200;
      // this.body = {token: token};
    // } else {
      // yield next;
    // }
  // })
  .use(router.routes());

// Listen
app.listen(config.PORT, function() {
  console.log('Listening on %s', config.PORT);
});

export default app;
