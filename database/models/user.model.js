const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('../schemas/user.scheme');

// hash password

// fire a function before saving to database (hash password)
userSchema.pre('save', async function (next) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('user not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('incorrect password');
    }
    return user;
}

const User = mongoose.model('user', userSchema);

module.exports = User;