const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v2', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v2/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v2/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});
