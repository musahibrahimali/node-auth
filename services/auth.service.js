const jwt = require('jsonwebtoken');
const User = require('../database/models/user.model');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/keys');

const handleErrors = (error) => {
    // error message to send to user
    let errors = {
        email: "",
        password: ""
    }

    // duplicate error code
    if (error.code === 11000) {
        errors.email = "The email is already in use by another account";
    }

    // validation errors
    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (error.message === 'user not found') {
        errors.email = "No Account associated with this email";
    }

    if (error.message === 'incorrect password') {
        errors.password = "Incorrect Password";
    }

    return errors;
}

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

class AuthService {
    LoginGet = (request, response) => {
        return response.render('login', { title: "Log In" });
    }

    LoginPost = async (request, response) => {
        const { email, password } = request.body;
        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ userId: user._id });
        } catch (error) {
            const errors = handleErrors(error);
            response.status(400).json({ errors });
        }
    }

    RegisterGet = (request, response) => {
        return response.render('signup', { title: "Sign Up" });
    }

    RegisterPost = async (request, response) => {
        const { email, password } = request.body;
        try {
            const user = await User.create({ email, password });
            const token = createToken(user._id);
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ userId: user._id });
        } catch (error) {
            const errors = handleErrors(error);
            response.status(400).json({ errors });
        }
    }

    LogOut = async (request, response) => {
        response.cookie('jwt', '', { maxAge: 1 });
        response.redirect('/');
    }
}

module.exports = new AuthService();