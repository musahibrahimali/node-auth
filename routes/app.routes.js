const { Router } = require('express');
const router = Router();
const appController = require('../controllers/app.controller');
const { checkUser } = require('../middleware/auth.middleware');

router.get('*', checkUser);
router.get('/', appController.home_page);

module.exports = router;
