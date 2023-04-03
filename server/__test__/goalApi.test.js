const axios = require('axios');
const makeid = require('./makeString.js');


describe('CREATE GOAL TEST', () => {
    
    test('Create a saving goal correctly', async () => {
        const title=makeid(3);
        const savings=8000;
        const startingAmount=500;
        const startDate= new Date( "4-4-2023").toISOString().slice(0,10).replace('T',' ');
        const endDate=new Date("6-4-2023").toISOString().slice(0,10).replace('T',' ');
        const description= makeid(3);
        const url="http://localhost:3002/api/createGoal";


        const response = await axios.post(url,{title,savings,startingAmount,startDate,endDate,description});
        
        expect(response.status).toBe(200);
    });
    
});