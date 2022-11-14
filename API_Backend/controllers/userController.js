/*
This controller is specifically for users Login, Register and Profile functionality, contains the following functions
userRegistration -> this function creates a new user in the DB
userLogin -> this user validates the user and sends user data along with a JWT token
getUserById -> get specific user profile data based on the user ID
*/
const logger = require("../config/logger")
const services = require("../config/services");
const dbModel = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = dbModel.user;

async function userRegistration(req, res, next) {
    try {
        // Get user input
        const { username, email, password } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        } else {

            // check if user already exist
            const oldUser = await User.findOne({ where: { email: email } });

            // Validate if user exist in our database
            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            } else {

                //Encrypt user password
                encryptedPassword = await bcrypt.hash(password, 10);

                // Create user in our database
                const user = await User.create({
                    username: username,
                    email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: encryptedPassword,
                });

                // Create token
                const token = jwt.sign(
                    { user_id: user.uid, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.JWT_EXPIRE,
                    }
                );
                // save user token
                user.token = token;

                logger.info(`User got registered with ID: ${user.uid}`)

                // return new user
                res.status(201).json(user);
            }
        }
    } catch (err) {
        logger.error(JSON.stringify(err));
    }
}

async function userLogin(req, res, next) {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ where: { email: email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.JWT_EXPIRE,
                }
            );

            // save user token
            user.token = token;

            logger.info(`User with ID ${user.uid} got logged In`)
            // user
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        logger.error(JSON.stringify(err));
    }
}

async function getUserById(req, res, next) {
    // get the User ID
    let uid = req.params.uid

    // find one from the user table
    User.findOne({
        where: { uid: uid }
    }).then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        logger.error(JSON.stringify(err))
        res.status(400).send(err)
    });
}


module.exports = { getUserById, userRegistration, userLogin };
