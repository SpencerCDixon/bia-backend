
describe('(Habits)', function() {
  describe('GET #index', function() {
    it('throws when no authentication is given', function(done) {
      api.get('/habits')
        .auth('incorrect', 'credentials')
        .expect(401, done)
    });

    it('returns 200 with basic auth', function(done) {
      api.get('/habits')
        .auth(process.env.AUTH_NAME, process.env.AUTH_PASS)
        .expect(200, done)
    });
  });
});
