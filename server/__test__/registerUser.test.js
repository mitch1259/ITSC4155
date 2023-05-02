const axios = require('axios');
const makeid = require('./makeString.js');

describe('USER REGISTRATION TEST', () => {
  
    test('should register user for new account properly', async () => {
        const firstName = "TEST" + makeid(3);
        const lastName = makeid(3);
        const email = makeid(3) + "@test.com";
        const password = "Testing1!";
        const url = 'http://localhost:3002/api/registerUser';

        const response = await axios.post(url, {
            firstName, lastName, email, password
        });

        expect(response.status).toBe(200);
    });
});