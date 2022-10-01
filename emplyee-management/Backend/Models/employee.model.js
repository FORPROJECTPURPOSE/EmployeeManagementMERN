const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    age: {type: Number, required: true,},
    position: {type: String, required: true,},
    email: {type: String, required: true, unique: true},

}, {
    timestamps: true,
});

const Employee = mongoose.model('Employee', userSchema);

module.exports = Employee;