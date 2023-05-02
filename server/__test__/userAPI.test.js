const axios = require('axios');

describe('USER LOGIN / REGISTRATION TESTS', () => {
  test('1. should log in user', async () => {
    const email = 'test@test.com';
    const password = 'Password14!';
    const url = 'http://localhost:3002/api/loginUser';

    const response = await axios.post(url, {
      email,
      password
    });

    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
