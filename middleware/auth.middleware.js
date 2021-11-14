const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const User = require('../database/models/user.model');

const requireAuth = (request, response, next) => {
    const token = request.cookies.jwt;

    // check if token is valid
    if (token) {
        jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
            if (error) {
                // if the token is invalid, redirect to login
                response.redirect('/login');
            } else {
                request.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        // if no token, redirect to login
        response.redirect('/login');
    }
}

// check current user
const checkUser = (request, response, next) => {
    const token = request.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, async (error, decodedToken) => {
            if (error) {
                response.locals.user = null;
                next();
            } else {
                request.decodedToken = decodedToken;
                let user = await User.findById(decodedToken.id);
                response.locals.user = user;
                next();
            }
        });
    } else {
        response.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser,
}