const User = require('../models/User');

module.exports = {
    async store(req, res) {

        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if(!user){
            const tokenTrello = '#';
            const token = '#';
            const consumerKey = '#';
            user = await User.create({ email, password, token, consumerKey, tokenTrello });
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