const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, {
    timestamps: true
});

module.exports = userSchema;