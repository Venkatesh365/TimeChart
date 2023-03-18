const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');
const hellWorldoController = require('../controllers/helloworld.js');

router.get('/helloworld', hellWorldoController.helloWorld);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
