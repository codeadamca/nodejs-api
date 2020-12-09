const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Member = new Schema({
    first: {type: String},
    last: {type: String},
    email: {type: String},
    admin: {type: Boolean}
});
module.exports = mongoose.model('Member', Member);
