const axios = require('axios');
const makeid = require('./makeString.js');

describe('GET BOARDS TEST', () => {

    test('Get all boards correctly', async () => {
        const userID = 10027;
        const url = "http://localhost:3002/api/get/currentUser/allBoards";

        const response = await axios.post(url,{userID});

        expect(response.status).toBe(200);
    });
});