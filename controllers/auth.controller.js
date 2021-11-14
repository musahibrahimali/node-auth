const authService = require('../services/auth.service');

const login_get = (request, response) => {
    authService.LoginGet(request, response);
}

const login_post = (request, response) => {
    authService.LoginPost(request, response);
}

const register_get = (request, response) => {
    authService.RegisterGet(request, response);
}

const register_post = (request, response) => {
    authService.RegisterPost(request, response);
}


const log_out = (request, response) => {
    authService.LogOut(request, response);
}


module.exports = {
    login_get,
    login_post,
    register_get,
    register_post,
    log_out,
}