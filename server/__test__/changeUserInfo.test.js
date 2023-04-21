const axios = require('axios');
const makeid = require('./makeString.js');

describe('CHANGE USER INFO TEST', () => {
    test('Change a users information correctly', async () => {
        const firstName = makeid(3);
        const lastName = makeid(3);
        const email = makeid(3);
        const password = makeid(3);
        const userID = 10009;
        const url = "http://localhost:3002/api/changeUserInfo";

        response = await axios.post(url, {
            firstName, 
            lastName,
            email,
            password,
            userID
        });

        expect(response.status).toBe(200);
    });
});



// app.post('/api/changeUserInfo', (req, res) => {
    
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const password = req.body.password;
//     const userID = req.body.userID;

//     const sqlInsert = "UPDATE budgitdb.users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE userID = ?";
//     db.query(sqlInsert, [firstName, lastName, email, password, userID], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//     });
// });