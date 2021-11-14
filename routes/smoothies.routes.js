const { Router } = require('express');
const router = Router();
const smoothiesController = require('../controllers/smoothies.controller');
const { requireAuth, checkUser } = require('../middleware/auth.middleware');

// protected routes (only logged in users can view this page)
router.get('*', checkUser);
router.get('/smoothies', requireAuth, smoothiesController.smoothies_page);

module.exports = router;
