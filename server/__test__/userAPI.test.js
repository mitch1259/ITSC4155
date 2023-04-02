const axios = require('axios');

describe('USER LOGIN / REGISTRATION TESTS', () => {
  test('1. should log in user', async () => {
    const email = 'ttest@test.com';
    const password = 'test';
    const url = 'http://localhost:3002/api/loginUser';

    const response = await axios.post(url, {
      email,
      password
    });

    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});



// describe('USER LOGIN / REGISTRATION TESTS', () => {
//     test('2. should register user for new account properly', async () => {
//         const firstName = makeid(3);
//         const lastName = makeid(3);
//         const email = makeid(3);
//         const password = makeid(3);
//         const url = 'http://localhost:3002/api/registerUser';
    
//         const response = await axios.post(url, {
//             firstName, lastName, email, password
//         });
    
//         expect(response.status).toBe(200);
//       })
//   });



