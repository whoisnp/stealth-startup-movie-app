require("dotenv").config();

const express = require("express");

const app = express();
const cors = require('cors');


const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: '*'
}));

//Routers goes here ....

const healthcheck = require('./routes/healthcheck')
const user = require('./routes/user')
const movies = require('./routes/movies')

/** This endpoint checks whether application build is successful
 *  and running properly or not.  */

app.use('/ping', healthcheck)
app.use('/user', user)
app.use('/movies', movies)
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

// Routing ends here ...

module.exports = app;