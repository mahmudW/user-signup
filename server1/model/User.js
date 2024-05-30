const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    registered_in_serverb : { type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);