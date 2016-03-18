var koa    = require('koa'),
    logger = require('koa-logger'),
    router = require('koa-router')(),
    auth   = require('koa-basic-auth'),
    config = require('./config')

var app = koa();

// Models
var habits = require('./models/habit');

// Routes
router
  .redirect('/', '/habits/something')
  .get('/habits', habits.index)
  .get('/habits/:description', habits.show)
  .post('/habits', habits.create);

// Middleware
app
  .use(logger())
  .use(auth({
    name: process.env.AUTH_NAME, pass: process.env.AUTH_PASS
  }))
  .use(router.routes())

// Listen
app.listen(config.PORT, function() {
  console.log('Listening on %s', config.PORT);
});
