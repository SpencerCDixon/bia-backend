// Libraries
import koa         from 'koa';
import koaRouter   from 'koa-router';
import koaLogger   from 'koa-logger';
import koaAuth     from 'koa-basic-auth';
import koaBody     from 'koa-body';
import koaValidate from 'koa-validate';
import koaCors     from 'koa-cors';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// Internal
import config from './config';
import habits from './models/habit';
import goals  from './models/goal';
import weights from './models/weight';

const app = koa();
const router = koaRouter();

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
  .get('/weights', weights.index);

// Middleware
app
  .use(koaBody())
  .use(koaValidate())
  .use(koaLogger())
  .use(koaCors())
  .use(koaAuth({
    name: config.userAuth,
    pass: config.userPass,
  }))
  .use(router.routes());

// Listen
app.listen(config.PORT, function() {
  console.log('Listening on %s', config.PORT);
});

export default app;
