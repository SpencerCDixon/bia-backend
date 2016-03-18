var koa    = require('koa'),
    logger = require('koa-logger'),
    router = require('koa-router')(),
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
  .use(router.routes());

// Listen
app.listen(config.PORT, function() {
  console.log('Listening on %s', config.PORT);
});
