const mongoose = require('mongoose');

const KitSchema = new mongoose.Schema({
    boardId: String,
    boardName: String,
    userId: String,
    isActive: Boolean
});

module.exports = mongoose.model('Kit', KitSchema);

