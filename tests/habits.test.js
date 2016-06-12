import config from 'config';

const { userAuth, userPass, db } = config;

describe('(Habits)', function() {
  beforeEach(function() {
    db.get('habits').drop();
  });

  describe('GET #index', function() {
    it('throws when no authentication is given', function(done) {
      api.get('/habits')
        .auth('incorrect', 'credentials')
        .expect(401, done)
    });

    it('returns 200 with basic auth', function(done) {
      api.get('/habits')
        .auth(userAuth, userPass)
        .expect(200, done)
    });
  });

  describe('GET #show', function() {
    it('returns error when no habits found', function(done) {
      api.get('/habits/random_habit')
        .auth(userAuth, userPass)
        .expect({error: 'habit not found'})
        .expect(404, done)
    });

    it('fetches habit by description slug', function(done) {
      const habit = db.get('habits').insert({name: 'my new habit'});

      api.get(`/habits/${habit.query._id}`)
        .auth(userAuth, userPass)
        .expect(200)
        .end((error, response) => {
          expect(response.body.name).to.eql('my new habit');
          done()
        })
    });
  });
});
