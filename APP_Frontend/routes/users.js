const express = require("express");
const router = express.Router();
const axios = require("axios");
const service = require("../config/service")


// user register API call
router.post("/register", (req, res) => {
    const { name, email, password, confirmPassword } =
        req.body;

    let alerts = [];
    console.log(alerts);

    if (!name | !email | !password | !confirmPassword) {
        alerts.push({ msg: "Enter all fields!" });
        console.log(alerts);
        res.render("register", {
            alerts,
        });
    } else if (password != confirmPassword) {
        alerts.push({ msg: "Passwords do not match!" });
        res.render("register", {
            alerts,
        });
    } else {
        // bcrypt.hash(password, saltRounds, (err, hash) => {
        let newUser = {
            "username": name,
            "email": email,
            "password": password,
        };
        axios.post(`${service.backend.host}:${service.backend.port}${service.backend.userRegistration}`, newUser)
            .then((response) => {
                checkStatus(response)
            })
            .then(() => {
                alerts.push({ msg: "Registration successfull!" });
                res.render("login", {
                    alerts,
                });
            })
            .catch((err) => {
                alerts.push({ msg: "Email already exists!" });
                res.render("register", {
                    alerts,
                });
            });
        // });
    }
});

// user Login API call 
router.post("/login", (req, res) => {
    let { email, password } = req.body;
    let alerts = [];

    if (!email | !password) {
        alerts.push({ msg: "Enter email and password!" });

        res.render("login", {
            alerts,
        });
    } else {
        let findUser = {
            "email": email,
            "password": password,
        };
        axios.post(`${service.backend.host}:${service.backend.port}${service.backend.userLogin}`, findUser)
            .then((response) => checkStatus(response))
            .then((user) => {
                // bcrypt.compare(findUser.password, user.password, function (err, match) {
                req.session.user = {
                    token: user.data.token,
                    uid: user.data.uid
                };
                service.headers.headers["x-access-token"] = user.data.token
                res.redirect(`/movies`);
                // });
            })
            .catch((err) => {
                console.log(err);

                alerts.push({ msg: "Email or Password is wrong!" });
                res.render("login", {
                    alerts,
                });
            });
    }
});

// user logout session destroy
router.get("/logout", (req, res) => {
    const alerts = [];
    alerts.push({ msg: "You were logged out!" });
    req.session.user = {};
    service.headers.headers["x-access-token"] = ""

    res.render("login", {
        alerts,
    });
});

// user Profile API call
router.get("/profile", (req, res) => {
    const uid = req.session.user.uid;

    axios.get(`${service.backend.host}:${service.backend.port}${service.backend.profile}/${uid}`, service.headers)
        .then((response) => checkStatus(response))
        .then((data) => {
            let user = data.data
            res.render("profile", {
                user,
            });
        })
        .catch((err) => {
            alerts.push({ msg: "Could'nt load your profile" });

            console.log(err);
            res.render("profile", {
                alerts,
            });
        });
});


// check status of the API calls made
function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        throw new Error();
    }
}
module.exports = router;
