const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');


router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/signup', authController.register_get);
router.post('/signup', authController.register_post);

router.get('/logout', authController.log_out);

module.exports = router;
