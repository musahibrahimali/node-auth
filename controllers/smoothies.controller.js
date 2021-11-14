const smoothiesService = require('../services/smoothies.service');
const requireAuth = require('../middleware/auth.middleware');

const smoothies_page = (request, response) => {
    smoothiesService.Index(request, response);
}


module.exports = {
    smoothies_page,
}