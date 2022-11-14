const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// user registration
router.post('/register', userController.userRegistration);
// user login
router.post('/login', userController.userLogin);
// user profile
router.get('/:uid', auth, userController.getUserById);

module.exports = router;