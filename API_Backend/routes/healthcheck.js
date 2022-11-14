const express = require('express')
let app = express.Router()

var healthcheckController = require('../controllers/healthcheckController');


// GET system health .

app.get('/', healthcheckController.ping);

module.exports = app