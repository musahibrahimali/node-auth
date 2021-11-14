const appService = require('../services/app.service');

const home_page = (request, response) => {
    appService.Index(request, response);
}

module.exports = {
    home_page
}