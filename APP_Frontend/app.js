require("dotenv").config();

const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const cors = require('cors');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: '*'
}));

//Routers goes here ....

const dashboard = require('./routes')


app.use(expressLayouts);
app.set("view engine", "ejs");


/** This endpoint checks whether application build is successful
 *  and running properly or not.  */

app.use('/', dashboard)
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