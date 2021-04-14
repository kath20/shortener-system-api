const request = require('supertest');
const app = require('../app');

describe('App', function() {
  it('can get short cut', function(done) {
    request(app)
      .get('/getShortcut')
      .expect(/respond with a resource GETSHORTCUT/, done);
  });
}); 
