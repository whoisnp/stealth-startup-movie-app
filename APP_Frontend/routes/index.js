const express = require('express');
const router = express.Router();

// main route where all the Links to gitHub video link and link exisit
router.get('/', (req, res) => {
    res.render('indexPage');
})

// Login page
router.get('/login', (req, res) => {
    res.render('login');
})

// register page 
router.get('/register', (req, res) => {
    res.render('register');
})

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;