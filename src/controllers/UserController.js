const User = require('../models/User');
const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

async function getToken(email, password) {
    let projectsResponse = await fetch('https://api.strateegia.digital/users/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(email + ":" + password).toString('base64')
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
                    return response.text();
                })
                .then(response => token = response);

    return JSON.parse(projectsResponse);
} 

module.exports = {
    async store(req, res) {

        let { email, password } = req.body;

        const encryptedEmail = CryptoJS.SHA256(email).toString(CryptoJS.enc.Base64);
        const encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

        let user = await User.findOne({ email: encryptedEmail, password: encryptedPassword });
        console.log(user);

        let strateegia_token = await getToken(email, password);

        email = encryptedEmail;
        password = encryptedPassword;

        if(!user && strateegia_token != '403'){
            console.log('Novo usuário');

            const tokenTrello = '#';
            const token = strateegia_token.access_token;
            const consumerKey = '#';
            user = await User.create({ email, password, token, consumerKey, tokenTrello });
        }

        console.log('Strateegia Token: ', strateegia_token.access_token);
        console.log('User token: ', user.token);

        if(user && strateegia_token.access_token !== user.token) {
            console.log('Mudou o token');

            user.token = strateegia_token.access_token;

            userUpdate = await User.updateOne({ email: email }, {token: strateegia_token.access_token });
        }

        return res.json(user);
    },

    async show(req, res) {
        const { email, password } = req.body;

        const encryptedEmail = CryptoJS.SHA256(email).toString(CryptoJS.enc.Base64);
        const encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);        

        const user = await User.findOne({ email: encryptedEmail, password: encryptedPassword });

        return res.json(user);
    },

    async update(req, res) {
        const { userEmail, tokenTrello, consumerKey } = req.body;

        const encryptedEmail = CryptoJS.SHA256(userEmail).toString(CryptoJS.enc.Base64);

        const user = await User.updateOne({ email: encryptedEmail }, {consumerKey: consumerKey, tokenTrello: tokenTrello});
        
        return res.json(user);
    },

    async delete(req, res) {
        const { email } = req.body;

        const encryptedEmail = CryptoJS.SHA256(email).toString(CryptoJS.enc.Base64);

        try {
            const user = await (await User.findOne({ email: encryptedEmail })).delete();

            return res.json(user);
        } catch(error){
            console.log(error);

            return res.json({
                error: true,
                message: error.message
            });
        }


        
    }
};