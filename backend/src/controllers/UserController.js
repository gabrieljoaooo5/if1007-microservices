const User = require('../models/User');
const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

async function getToken(email, password) {
    // var request = require('request');


    // var options = {
    //     url: 'https://api.strateegia.digital/users/v1/auth/signin',
    //     method: 'GET',
    //     headers: { 'Authorization': 'Basic jgsa@cin.ufpe.br:' },
    //     formData: {
    //         'username':'jgsa@cin.ufpe.br',
    //         'password':''
    //     },

    // }

    // request.get(options, function(err,res,body) {
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log('status code :', res.statusCode);
    // });
//     var request = require('request');
//         url = "https://api.strateegia.digital/users/v1/auth/signin",
//         form

// request(
//     {
//         url : "https://api.strateegia.digital/users/v1/auth/signin",
//         formData: {
//             'username': 'jgsa@cin.ufpe.br',
//             'password': ''
//         }
//         // headers : {
//         //     "Authorization" : "Basic "
//         // }

//     },
//     function(error, response, body){
//         if(error) {
//             console.log(error);
//         } else {
//             console.log(response.statusCode, body);
//             json = JSON.parse(response.body);
//             console.log(response.statusCode, body);
//     }
//     });

    let token = '';
    let projectsResponse = await fetch('https://api.strateegia.digital/users/v1/auth/signin', {
                method: 'GET',
                formData: {
                            'username':'',
                            'password':''
                },
                user: '',
                password: '',
                Headers: {
                    'Authorization': 'Basic ' + Buffer.from('' + ":" + '').toString('base64')
                }
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    if (response.status == 403) {
                        console.log('erro aq');
                        return '403';
                    }
                    return JSON.parse(response.text());
                })
                .then(response => token = response);
    return '403';
} 

module.exports = {
    async store(req, res) {

        const { email, password } = req.body;
        let encryptedPassword = CryptoJS.SHA256(password);
        encryptedPassword = encryptedPassword.toString(CryptoJS.enc.Base64);
        let user = await User.findOne({ email });
        let strateegia_token = await getToken(email, password);
        console.log(strateegia_token);
        if(!user && strateegia_token != '403'){
            const tokenTrello = '#';
            const token = strateegia_token.access_token;
            const consumerKey = '#';
            user = await User.create({ email, encryptedPassword, token, consumerKey, tokenTrello });
        }

        return res.json(user);
    },

    async show(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        return res.json(user);
    },

    async update(req, res) {
        const { userEmail, tokenTrello, consumerKey } = req.body;
        console.log(userEmail);

        const user = await User.updateOne({ email: userEmail }, {consumerKey: consumerKey, tokenTrello: tokenTrello});
        
        return res.json(user);
    }
};