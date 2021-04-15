const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: String,
    consumerKey: String,
    tokenTrello: String
});

module.exports = mongoose.model('User', UserSchema);

