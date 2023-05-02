const axios = require('axios');
const makeid = require('./makeString.js');

describe('get all transactions test', () => {
  
    test('should get all transactions from the transactions table', async () => {
    
        const url = 'http://localhost:3002/api/allTransactions';

        const response = await axios.get(url);

        expect(response.status).toBe(200);
    });
});