const {model, Schema} = require('mongoose');
// const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = model('Author', authorSchema);